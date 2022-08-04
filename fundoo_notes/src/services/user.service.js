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
  }};

//user login
export const userLogin = async (body) => {
    const logindata = await User.findOne({EmailId:body.EmailId})
    if(logindata){
      if(logindata.password == body.password){
        return logindata;}
      else{
        throw new Error("Invalid Password!");
      }}
    else{
      throw new Error("User not Exist!");
    } };