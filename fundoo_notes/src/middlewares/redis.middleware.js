 import { client } from "../config/redis";
 import HttpStatus from 'http-status-codes'

 export const redisAuth = async(req,res,next) =>{
    const value = await client.get('getAllData');
    if(value!=null){
        res.status(200).json({
            code:200,
            data:JSON.parse(value),
            message:"All notes Fetched successfully from Redis"
        })
    }else{
        next();
    }
};
 
export const redisAuthId = async(req,res,next) =>{
    const value = await client.get('getSingleData');
    if(value!=null){
        res.status(200).json({
            code:200,
            data:JSON.parse(value),
            message:"Notes Fetched successfully from Redis"
        })
    }else{
        next();
    }
};