import express, { NextFunction, Request, Response } from 'express';
import authRoute from './routes/auth.route';
import userRouter from './routes/user.route';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import articleRouter from './routes/article.route';
import cors from 'cors';
const app = express();
app.use(cors());
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Devboss API Doc ',
      version: '1.0.0',
      description: 'API documentation for Your Node.js TypeScript Project',
    },
    basePath: '/',
  },
  // Specify your route files here
};

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      description: 'Description of your API',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'https://api.example.com/v1',
    },
  ],
  apis: ['.src/routes/*.ts'],
  paths: {
    '/users': {
      get: {
        summary: 'Get a list of users',
        responses: {
          '200': {
            description: 'A list of users',
          },
        },
      },
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
              
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
          },
        },
      },
    },
  },
});

app.get('/api/v1/status', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRouter);

app.use('/api/v1/blog', articleRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send('Something went wrong!');
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
