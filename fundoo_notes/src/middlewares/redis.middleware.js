 import { client } from "../config/redis";

 export const redisCheck = async (req, res, next) =>{
     const value = await client.get('getData');
     if(value){
         res.status(200).json({
             code:200,
             data:JSON.parse(value),
             message: 'Notes fetched successfully from redis'
         });
     }else{
         next();
     }
 }