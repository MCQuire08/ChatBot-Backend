import express from 'express';
import cors from 'cors';  // Importa el paquete cors
import userRouter from './routes/userRoutes'; 
import chatBotRouter from './routes/chatBotRoutes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', userRouter);
app.use('/chatBot', chatBotRouter);

export default app;
