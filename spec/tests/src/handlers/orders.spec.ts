import supertest from 'supertest';
import app from '../../../../src/server';
import { UserStore } from '../../../../src/models/user';

const request = supertest(app);
const userStore = new UserStore();

describe('Order endpoints', () => {
  it('POST /orders', async () => {
    const response = await request.post('/orders')
      .send({
        status: 'Complete',
        user_id: 1
      });
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
});