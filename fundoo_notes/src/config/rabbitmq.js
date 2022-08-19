import { registerMail } from '../utils/user.util';

const amqplib = require('amqplib/callback_api');
const queue = 'user_register';

//sender
export const sender = (data) => amqplib.connect('amqp://localhost', (err, conn) => {
    const strData = JSON.stringify(data);
    if (err){
         throw err;
    }
    conn.createChannel((err,ch1) => {
        if (err){ 
            throw err;
        }
        ch1.assertQueue(queue);
        ch1.sendToQueue(queue, Buffer.from((strData)));
        console.log("Mail send successfully",`${strData}`);
    
    });
});

//consumer-listner
const receiver = () => amqplib.connect('amqp://localhost', (err, conn) => {
    if (err){ 
        throw err;
    }
    conn.createChannel((err, ch2) => {
    if (err) {
        throw err;
    }
    ch2.assertQueue(queue);
    ch2.consume(queue, (strData) => {
      if (strData !== null) {
        const msg = JSON.parse(strData.content.toString());
        console.log(msg);
        ch2.ack(strData);
        registerMail(msg.emailId);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });
});

receiver();
