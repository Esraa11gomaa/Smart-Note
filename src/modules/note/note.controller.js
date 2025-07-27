import { Router } from 'express'
import * as NoteService from './service/note.service.js';
import * as validators from './note.validation.js'
import { validation } from '../../middleware/validation.middlware.js';
import { authentication } from './../../middleware/auth.middlware.js';

const router = Router();

router.post("/createNote", validation(validators.createNoteSchema), authentication, NoteService.createNoteSchema)

router.delete('/:id',authentication, NoteService.deleteNote)

router.post('/:id/summarize', authentication(), validation(validators.summarizeNoteSchema), NoteService.summarizeNote )

export default router