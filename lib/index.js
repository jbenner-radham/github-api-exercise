import express from 'express';
import homeRoute from './routes/home-route.js';

const app = express();

app.get('/', homeRoute);

export default app;
