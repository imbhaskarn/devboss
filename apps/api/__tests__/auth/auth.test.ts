import request from 'supertest';
import { faker } from '@faker-js/faker';

import app from '../../src/app'; // Import your Express app instance here

describe('User Authentication APIs', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL =
            'postgresql://postgres:secret@localhost:5422/postgres';
        process.env.user = 'postgres';
    });

    afterAll(async () => {
        // Cleanup, close the database connection, etc.
    });

    it('should handle user registration', async () => {
        const mockRequest = {
            body: {
                username: 'tpstuser',
                email: 'tpst@example.com',
                password: 'P@ssw0rd',
            },
        };

        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(mockRequest.body);
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.result).toBe('success');
        expect(response.body.message).toBe('Signup Successfull.');
        expect(response.body.data.accessToken).toBeDefined();
        expect(response.body.data.user).toBeDefined();
    });

    it('should handle user login', async () => {
        const mockRequest = {
            body: {
                email: 'tpst@example.com',
                password: 'P@ssw0rd',
            },
        };

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send(mockRequest.body);
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Login successfull.');
        expect(response.body.data.accessToken).toBeDefined();
        expect(response.body.data.user).toBeDefined();
    });
});
