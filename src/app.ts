import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes'; 
import chatBotRouter from './routes/chatBotRoutes';
import responseRouter from './routes/responsesRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/chatBot', chatBotRouter);
app.use('/responses',responseRouter)


export default app;
