import express from 'express';
import errorHandler from './middlewares/expressHandler';

const app = express();
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
