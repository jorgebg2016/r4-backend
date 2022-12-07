import express, { Application } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';


dotenv.config();

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(router);

const port = process.env.APP_PORT || 3333;

app.listen(port, async () => {

  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});