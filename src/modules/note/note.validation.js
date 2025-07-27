import joi from 'joi'
import { generalFields } from '../../middleware/validation.middlware.js'

export const createNoteSchema = joi.object({
title: generalFields.title.required(),
content: generalFields.content.required()
})

export const summarizeNoteSchema = joi.object({
    id: generalFields.id.required()
})