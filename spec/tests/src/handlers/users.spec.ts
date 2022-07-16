import supertest from 'supertest';
import app from '../../../../src/server';

const request = supertest(app);

let token = '';

describe('Test user endpoints', () => {
  it('POST /users/authenticate', async () => {
    const response = await request.post('/users/authenticate')
      .send({
        username: 'raymondw',
        password: 'newPassword'
      });
    token = response.body;
    expect(response.status).toBe(200);
  })

  it('POST /users', async () => {
    const response = await request.post('/users')
      .send({
        username: 'newuser',
        first_name: 'New',
        last_name: 'User',
        password: 'thisIsAPassword'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /users', async () => {
    const response = await request.get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /users/:id', async () => {
    const response = await request.get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /users (unauthorized)', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });

  it('POST /users (unauthorized)', async () => {
    const response = await request.post('/users')
      .send({
        username: 'unauthorized',
        first_name: 'Unauthorized',
        last_name: 'User',
        password: 'badPassword'
      });
    expect(response.status).toBe(401);
  });

  it('GET /users/:id (unauthorized)', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(401);
  });
});