import userModel from '../../../DB/models/User.model.js'
import { AsyncHandeler } from "../../../utils/response/error.response.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash, generateHash } from "../../../utils/security/hash.security.js";
import { emailEvent } from './../../../utils/events/email.event.js';
import * as dbService from '../../../DB/dbService.js'

export const signup = AsyncHandeler(
    async (req, res, next) => {

        const { username, email, password } = req.body

        if (await dbService.findOne({ model: userModel, filter: { email } })) {

            return next(new Error("Email exist ", { cause: 409 }))
        }

        const user = await dbService.create({
            model: userModel,
            data: {
                username,
                email,
                password: password
            }
        })

        emailEvent.emit("sendConfirmEmail", { id: user._id, email })

        return successResponse({ res, message: "Done", status: 201 })
    }
)

export const confirmEmail = AsyncHandeler(
    async (req, res, next) => {
        const { email, code } = req.body

        const user = await dbService.findOne({
            model: userModel,
            filter: { email }
        })
        if (!user) {
            return next(new Error("In-valid Account", { cause: 404 }))
        }
        if (user.confirmEmail) {
            return next(new Error("Already verified", { cause: 409 }))
        }

        const currentTime = new Date()

        if (!user.confirmEmailOtpExpiry || currentTime > user.confirmEmailOtpExpiry) {
            return next(new Error("OTP Expired", { cause: 400 }));
        }

        if (!compareHash({ plainText: code, hashValue: user.confirmEmailOtp })) {
            return next(new Error("In-valid code", { cause: 400 }))
        }
        await dbService.updateOne({
            model: userModel,
            filter: { email },
            data: { confirmEmail: true, $unset: { confirmEmailOtp: 0, confirmEmailOtpExpiry: 0 } }
        })

        return successResponse({ res })
    }
)


export const logout = AsyncHandeler(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.decode(token);
    if (!decoded?.id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    await userModel.updateOne(
      { _id: decoded.id },
      { $addToSet: { revokedTokens: token } } 
    );

    res.status(200).json({ message: "Logged out successfully" });
  }
);
