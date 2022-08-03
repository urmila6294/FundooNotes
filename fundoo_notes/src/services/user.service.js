import User from '../models/user.model';

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
    const data = await User.create(body);
    return data;
  }
};

//user login
//export const userRegisteration = async (body) => {
  //const data = await User.findOne({emailId:body.emailId});
 // if(data){
   // if(data.password == body.password){
     // return data;}
      //else{
      //  throw new error("Invalid Password!"); }}
 // else{
    //throw new error("User not Exist!");
  //}
   // }
