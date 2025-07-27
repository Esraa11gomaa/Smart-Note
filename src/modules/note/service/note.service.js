import { AsyncHandeler } from './../../../utils/response/error.response.js';
import { successResponse } from './../../../utils/response/success.response.js';
import NoteModel from './../../../DB/models/Notes.model.js';
import * as dbService from '../../../DB/dbService.js'
import { summarizeText } from '../../../utils/openAI/Openai.js';


export const createNoteSchema = AsyncHandeler(
    async (req, res, next) => {
        const { title, content } = req.body
        const { error } = createNoteSchema.validate({ title, content })
        if (error) return res.status(400).json({ message: error.details[0].message })
        const note = await NoteModel.create({
            title,
            content,
            ownerId: req.user._id
        })

        return successResponse(res, 'Note created successfully', note)
    }
)

export const deleteNote = AsyncHandeler(
    async (req, res, next) => {
        const noteId = req.params._id
        const note = await dbService.findById({
            model: NoteModel,
            id: noteId
        })

        if (!note) {
            return next(new Error(`Unauthorized: You cannot delete this note `))
        }

        await dbService.findByIdAndDelete({
            model: NoteModel,
            id: noteId
        })

        return successResponse({ res, status: 200, message: 'Note deleted successfully' })
    }
)

export const summarizeNote = AsyncHandeler(
    async (req, res, next) => {
        const { id } = req.params
        const note = dbService.findOne({
            model: NoteModel,
            filter: id,
            select: {
                ownerId: req.user._id
            }
        })

        if (!note) {
            return next(new Error("Note not found or not owned by you", { cause: 404 }));
        }
        const summary = await summarizeText(note.content)

        return successResponse({ res, status: 200, message: "summarization succes", data: summary })
    }
)

