import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app:Express = express();
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined.');
}

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res:Response) => {
  res.send('Hello, TypeScript Node Express!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
