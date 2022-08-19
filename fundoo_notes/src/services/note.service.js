import Note from '../models/note.model';
import { client } from '../config/redis';

//Adding new note 
export const addNote = async (body) => {
    await client.del('getAllData');
    const data = await Note.create(body);
    return data;
};

//Getting all note
export const getAllNote = async (body) => {
    const data = await Note.find({userId:body.userId});
    await client.set('getAllData',JSON.stringify(data));
    return data;
};


//Getting single note by id
export const getSingleNote=async(_id)=>{
    const data=await Note.findOne({_id:_id});
    await client.set('getSingleData',JSON.stringify(data));
    if(data==null){
        throw new Error("Note is not found for given Id");
    }else{
      return data;
    }
};

//Update note by id
export const updateNote=async(_id,body)=>{
    await client.del('getAllData');
    const data=await Note.findByIdAndUpdate({_id:_id},body,{new:true});
    return data;
};

//Delete note by id
export const deleteNote=async(_id)=>{
    await client.del('getAllData');
    const data = await Note.findByIdAndDelete(_id);  
};

export const archiveNotes = async(_id) =>{
    await client.del('getAllData');
    const data = await Note.findByIdAndUpdate(
      {
       _id:_id
      },
     
      {
        isArchived: true
      },
      {
        new: true
      }
    );
    return data;
  }
  
  export const isTrash = async(_id) =>{
    await client.del('getAllData');
    const data = await Note.findByIdAndUpdate(
      {
        _id:_id
      },
      {
        isDeleted: true
      },
      {
        new: true
      }
    );
    return data;
  }
