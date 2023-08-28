import express, { NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/expressHandler';
import authRoute from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: 'false',
        message: 'Page not found',
        error: {
            statusCode: 404,
            message: 'You reached a route that is not defined on this server',
        },
    });
});
process.on('unhandledRejection', (reason: Error) => {
    console.log('Unhandled Promise Rejection: reason:');
    // console.error(reason.stack);
});
export default app;
