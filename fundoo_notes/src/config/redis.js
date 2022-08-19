 import {createClient} from 'redis';
 import logger from './logger';

 export const client = createClient();

 const redis = async () => {
 try {
     await client.connect();
     logger.info("Redis Connected");
 } catch (error) {
     console.log("Redis is not Connected");
 }
 }
 export default redis;