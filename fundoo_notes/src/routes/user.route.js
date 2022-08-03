import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
//import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user Registeration
router.post('', newUserValidator, userController.userRegisteration);

export default router;
