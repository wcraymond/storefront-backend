import supertest from 'supertest';
import app from '../../../../src/server';
import { UserStore } from '../../../../src/models/user';

const request = supertest(app);
const userStore = new UserStore();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InJheW1vbmR3IiwiZmlyc3RfbmFtZSI6IldpbGxpYW0iLCJsYXN0X25hbWUiOiJSYXltb25kIiwicGFzc3dvcmQiOiIkMmIkMTAkcURvUE1WRmpkaEFGRjJpWTBMaGJsLmZJbTEwMzcwd0lVTlVXQ0NKLlQzZlM0SFpaNUtxNVMifSwiaWF0IjoxNjU4MzQwNzE4fQ.ogP8L9L8z_37VLV5CYel3vny9ln3CrdqTIbZCfp9zF4';

describe('Test dashboard endpoints', () => {
  beforeAll(async () => {
    await userStore.create({
      username: 'raymondw',
      first_name: 'William',
      last_name: 'Raymond',
      password: 'newPassword'
    });
  });

  it('GET /top-five-products', async () => {
    const response = await request.get('/top-five-products');
    expect(response.status).toBe(200);
  });

  it('GET /current-orders-by-user/:id', async () => {
    const response = await request.get('/current-orders-by-user/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /completed-orders-by-user/:id', async () => {
    const response = await request.get('/completed-orders-by-user/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /current-orders-by-user/:id (unauthorized)', async () => {
    const response = await request.get('/current-orders-by-user/1')
    expect(response.status).toBe(401);
  });

  it('GET /completed-orders-by-user/:id (unauthorized)', async () => {
    const response = await request.get('/completed-orders-by-user/1')
    expect(response.status).toBe(401);
  })
});
