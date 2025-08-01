import connectDB from "./DB/connection.js"
import authController from './modules/auth/auth.controller.js'
import { globalErrorHandeling } from "./utils/response/error.response.js"
import userController from './modules/user/user.controller.js'
import noteController from './modules/note/note.controller.js'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from "express-rate-limit"


const bootstrap = (app, express) => {
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Welcome in node.js project powered by express and ES6" })
    })
    app.use("/auth", authController)
    app.use("/user", userController)
    app.use("/notes", noteController)
    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "In-valid routing" })
    })

    app.use(globalErrorHandeling)
    connectDB()
}

export default bootstrap