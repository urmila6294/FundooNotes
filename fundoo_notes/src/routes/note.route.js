import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
//import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note 
router.post('/addNote',noteValidator,noteController.addNote);

//route to get all note
router.get('/getAllNote', noteController.getAllNote);

//route to get single note by id
router.get('/:_id', noteController.getSingleNote);

//route to get update note by id
router.put('/:_id', noteController.updateNote);

//route to delete note by id
router.delete('/:_id', noteController.deleteNote);

//router to archive notes
router.put('/:_id/isArchive',noteController.archiveNotes);

//router to isDelete
router.put('/:_id/isDelete',noteController.isTrash); 


export default router