import supertest from 'supertest';
import app from '../../../../src/server';

const request = supertest(app);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InJheW1vbmR3IiwiZmlyc3RfbmFtZSI6IldpbGxpYW0iLCJsYXN0X25hbWUiOiJSYXltb25kIiwicGFzc3dvcmQiOiIkMmIkMTAkcURvUE1WRmpkaEFGRjJpWTBMaGJsLmZJbTEwMzcwd0lVTlVXQ0NKLlQzZlM0SFpaNUtxNVMifSwiaWF0IjoxNjU4MzQwNzE4fQ.ogP8L9L8z_37VLV5CYel3vny9ln3CrdqTIbZCfp9zF4';

describe('Order endpoints', () => {
  it('POST /orders', async () => {
    const response = await request.post('/orders')
      .send({
        status: 'Complete',
        user_id: 1
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('PUT /orders/:id', async () => {
    const response = await request.put('/orders/1')
      .send({
        id: 1,
        status: 'In Transit',
        user_id: 1
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /orders', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });

  it('GET /orders/:id', async () => {
    const response = await request.get('/orders/1');
    expect(response.status).toBe(200);
  });

  it('DELETE /orders/:id', async () => {
    const response = await request.delete('/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('PUT /orders/:id (unauthorized)', async () => {
    const response = await request.put('/orders/:id')
      .send({
        id: 1,
        status: 'In Transit',
        user_id: 1
      });
    expect(response.status).toBe(401);
  });

  it('DELETE /orders/:id (unauthorized)', async () => {
    const response = await request.delete('/orders/1');
    expect(response.status).toBe(401);
  });
});