import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {type: String},
    Description: {type: String},
    Color: {type: String},
    isArchived:{type: Boolean,default:false},
    isTrash:{type: Boolean,default:false},
    userId:{type:String}
  },
  {
    timestamps: true
  });
export default model('Note', noteSchema);
