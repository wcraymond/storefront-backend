import supertest from 'supertest';
import app from '../../../../src/server';

const request = supertest(app);

let token = '';

describe('Test product endpoints', () => {
  beforeAll(async () => {
    const response = await request.post('/users/authenticate')
      .send({
        username: 'raymondw',
        password: 'newPassword'
      });
    token = response.body;
  });

  it('POST /products', async () => {
    const response = await request.post('/products')
      .send({
        name: 'Test Product',
        price: 10,
        category: 'Tests'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('GET /products/:id', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('POST /products (unauthorized)', async () => {
    const response = await request.post('/products')
      .send({
        name: 'Unauthorized Product',
        price: 999,
        category: 'Negative'
      });
    expect(response.status).toBe(401);
  });

  it('GET /products/category/:category', async () => {
    const response = await request.get('/products/category/Tests');
    expect(response.status).toBe(200);
  });
});