import amqp from 'amqplib';

const amqplib = require('amqplib/callback_api');
const queue = 'tasks';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err){
   throw err;
  }

  //Sender
  conn.createChannel((err, ch1) => {
    if (err){
         throw err;
    }
    ch1.assertQueue(queue);

    setInterval(() => {
      ch1.sendToQueue(queue, Buffer.from('something to do'));
    }, 1000);
  });

  //Listner-Consumer
  conn.createChannel((err, ch2) => {
    if (err) {
        throw err;
    }
    ch2.assertQueue(queue);
    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        const rdata = msg.content.toString();
        console.log(`${rdata}`);
        ch2.ack(msg);
      } else {
        console.log('Comsumer is offline');
      }
    });
  });
});
