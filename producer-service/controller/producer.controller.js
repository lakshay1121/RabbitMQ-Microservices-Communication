import dotenv from "dotenv";
import amqp from "amqplib";


dotenv.config();

export const SendMessage = async (req, res) => {
  const {message} = req.body;

  if (!message)
    return res.status(400).json({ message: "message field is required!" });

  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = process.env.QUEUE_NAME;

    await channel.assertQueue(queue, { durable: true });

    const statusOfMessage = channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });

    if (statusOfMessage)
      return res.status(200).json({ message: `${message} posted to queue!` });

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};


export const TestProducerRouter = async (req, res)=>{

  return res.status(200).json({message:'producer route working!!'});
}
