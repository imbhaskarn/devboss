import express, { NextFunction, Request, Response } from 'express';
import authRoute from './routes/auth.route';
import userRouter from './routes/user.route';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Your API',
            version: '1.0.0',
            description:
                'API documentation for Your Node.js TypeScript Project',
        },
        basePath: '/',
    },
    apis: ['.src/routes/*.ts'], // Specify your route files here
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRouter);

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

export default app;
