import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes'; 
import chatBotRouter from './routes/chatBotRoutes';
import responseRouter from './routes/responsesRoutes';
import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/chatBot', chatBotRouter);
app.use('/responses',responseRouter);
app.use('/login',authRouter)
app.use('/product',productRouter)


export default app;
