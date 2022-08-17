import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as utilservice  from '../utils/user.util';


export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user Registeration
export const userRegisteration = async (body) => {
  const isPresent = await User.findOne({emailId:body.emailId});
  if(isPresent){
    throw new Error("User Already Exist!!");
  }
  else{
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(body.password,saltRounds); 
    body.password = hashPassword;
    const data = await User.create(body);
    return data;
  }};

//user login
export const userLogin = async (body) => {
  const data = await User.findOne({emailId:body.emailId});
  if(data==null){
    throw new Error("User not exist!"); 
  }else{
    const isPasswordCorrect = await bcrypt.compare(body.password,data.password);
    if(isPasswordCorrect){
      let token=jwt.sign({emailId:data.emailId,_id:data._id},process.env.NEW_SECRET_KEY);
      return token;
    }else{
    throw new Error("Password not Match!");
  }
}
};
//forget password
export const forgetPassword = async (body) => {
  const data = await User.findOne({ emailId: body.emailId });
  if (data) {
    const token = jwt.sign({ emailId: data.emailId, _id: data._id }, process.env.SECRET_KEY_PASSWORD);
    const result = await utilservice.sendMail(data.emailId, token);
    console.log(result);
    return result;
  } else {
    throw new Error("User not exist");
  }
};
//reset password
export const resetPassword = async (body) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  body.password = passwordHash;
  const data = await User.findOneAndUpdate({ emailId: body.emailId }, { password: body.password }, { new: true });
  console.log(data);
  if (data) {
    return data;
  } else {
    throw new Error("User not exist");
  }
};
