import amqp from "amqplib";
import { wss } from "../server.js";

export const GetMessage = async (req, res) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = process.env.QUEUE_NAME;

    await channel.assertQueue(queue, { durable: true });

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log("Consuming message:", messageContent);

          wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(messageContent);
            }
          });

          channel.ack(msg);
        }
      },
      { noAck: false }
    );

    res.status(200).send('Consumer started');
} catch (err) {
    console.log('Error while consuming:', err);
    res.status(500).json({ error: 'Error while fetching message', err });
}
};
