import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { passwordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user Registeration
router.post('', newUserValidator, userController.userRegisteration);

//to get all registered users
router.get('',userController.getAllUsers);

//route to login
router.post('/login',userController.userLogin);

//route to get forget password 
router.post('/forgetpassword', userController.forgetPassword);

//route to get reset passwword
router.put('/resetpassword', passwordAuth,userController.resetPassword);


export default router;