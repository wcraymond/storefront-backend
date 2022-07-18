import supertest from 'supertest';
import app from '../../../../src/server';

const request = supertest(app);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InJheW1vbmR3IiwiZmlyc3RfbmFtZSI6IldpbGxpYW0iLCJsYXN0X25hbWUiOiJSYXltb25kIiwicGFzc3dvcmQiOiIkMmIkMTAkcURvUE1WRmpkaEFGRjJpWTBMaGJsLmZJbTEwMzcwd0lVTlVXQ0NKLlQzZlM0SFpaNUtxNVMifSwiaWF0IjoxNjU4MzQwNzE4fQ.ogP8L9L8z_37VLV5CYel3vny9ln3CrdqTIbZCfp9zF4';

describe('Test product endpoints', () => {
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