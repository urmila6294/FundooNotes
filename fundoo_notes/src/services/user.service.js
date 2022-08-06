import User from '../models/user.model';
import bcrypt from 'bcrypt';

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
    const data = await User.findOne({emailId:body.emailId})
     if(data){
      const ispasswordcorrect = await bcrypt.compare(body.password,data.password)
      if(ispasswordcorrect){
      return data;
    }else{
      throw new Error("Password not match!")
    } }
  else{
    throw new Error("Invalid EmailID!")
  }};