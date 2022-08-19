import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userRegisteration = async (req, res, next) => {
  try {
    const data = await UserService.userRegisteration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Registeration successful'
    });
  } catch (error) {
  res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
  });
}
  };

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }};

  export const forgetPassword = async(req, res, next) => {
    try{
      const data = await UserService.forgetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User Fetched Successfully!'
      });
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };
  
  /**
   * Controller for Reset Password
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
   export const resetPassword = async(req, res, next) => {
    try{
      const data = await UserService.resetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User Fetched Successfully!'
      });
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };