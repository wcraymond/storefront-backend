import { OrderStore } from '../../../../src/models/order';
import { UserStore } from '../../../../src/models/user';

const orderStore = new OrderStore();
const userStore = new UserStore();

describe('Order model', () => {
  beforeAll(async () => {
    await userStore.create({
      first_name: 'Test',
      last_name: 'User',
      password: '12345'
    });
  });

  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });
  
  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderStore.delete).toBeDefined();
  });

  it('index method should list all orders', async () => {
    const result = await orderStore.index();
    expect(result).toEqual([]);
  });

  it('create method should add an order', async () => {
    const result = await orderStore.create({
      status: 'On Hold',
      user_id: 1
    });
    expect(result).toEqual({
      id: 1,
      status: 'On Hold',
      user_id: 1
    });
  });

  it('show method should return the specified order', async () => {
    const result = await orderStore.show('1');
    expect(result).toEqual({
      id: 1,
      status: 'On Hold', 
      user_id: 1
    });
  });

  it('update method should update an order', async () => {
    const result = await orderStore.update({
      id: 1,
      status: 'Complete',
      user_id: 1
    });
    expect(result).toEqual({
      id: 1,
      status: 'Complete',
      user_id: 1
    });
  });

  it('delete method should remove an order', async () => {
    await orderStore.delete('1');
    const result = await orderStore.index();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await userStore.delete('1');
  })
});