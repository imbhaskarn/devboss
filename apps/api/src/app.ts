import express from 'express';
import errorHandler from './middlewares/expressHandler';
import authRoute from './routes/auth.route';

const app = express();
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);

export default app;
