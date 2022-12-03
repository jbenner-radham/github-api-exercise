import dotenv from 'dotenv';
import express from 'express';
import { APP_DEFAULT_PORT } from './config.js';
import homeRoute from './routes/home-route.js';

dotenv.config();

const app = express();
const port = process.env.APP_PORT ?? APP_DEFAULT_PORT;

app.get('/', homeRoute);

app.listen(port, () => console.log(`App listening on port ${port}`));
