import express from 'express'
import dotenv from 'dotenv'
import producerRouter from './routes/producer.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use('/api/v1/producer',producerRouter);

app.get('/', (req,res)=>{
    return res.status(200).json({messsage:'Home'})
})
app.listen(PORT, ()=>{
    console.log(`app listening on ${PORT}`)
})