import app from '../../src/app';
import request from 'supertest';

describe('User API', () => {
    it('should create a resource with valid data', async () => {
        const postData = {
            // Define your POST request data here
            // For example, if you're sending JSON data:
            username: 'username',
            password: 'P@ssw0rd',
        };

        const response = await request(app)
            .post('/api/endpoint')
            .send(postData)
            .set('Accept', 'application/json'); // Set the content type if needed

        // Assertions
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result');
        expect(response.body.result).toBe('success');
    });
});
