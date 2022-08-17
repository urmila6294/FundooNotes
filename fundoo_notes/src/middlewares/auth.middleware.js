import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.NEW_SECRET_KEY,function(err,decoded){
      if(err){
       res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is Incorrect'
        });
      }else{
        req.body.userId = decoded.emailId;
        next();
      }
    });
   };

//making the middleware for reset password

export const passwordAuth = async (req, res, next) => {
  
  let bearerToken = req.header('Authorization');
  if (!bearerToken)
    throw {
      code: HttpStatus.BAD_REQUEST,
      message: 'Authorization token is required'
    };
  bearerToken = bearerToken.split(' ')[1];
  console.log(bearerToken);
  jwt.verify(bearerToken, process.env.SECRET_KEY_PASSWORD,function(err,decoded){
    console.log(decoded);
    if(err){
     res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is Incorrect'
      });
    }
    else{
      
      req.body.emailId = decoded.emailId;
      next();
    }

  });  
};

