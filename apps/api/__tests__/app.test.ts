import app from '../src/app';
import request from 'supertest';

describe('User API', () => {
    it('should return user data', async () => {
        const response = await request(app).get('/status');

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toBe('OK');
    });
});
