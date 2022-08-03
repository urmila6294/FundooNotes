import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {type: String,required:true},
    lastName: {type: String,required:true},
    emailId: {type: String,required:true,unique:true},
    password:{type: String,required:true},
  },
  {
    timestamps: true
  });
export default model('User', userSchema);
