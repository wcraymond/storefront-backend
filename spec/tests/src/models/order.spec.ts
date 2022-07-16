import { OrderStore } from '../../../../src/models/order';

const orderStore = new OrderStore();

describe('Order model', () => {
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });
  
  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('index method should list all orders', async () => {
    const result = await orderStore.index();
    expect(result).toEqual([
      {
        id: 1,
        status: 'Complete',
        user_id: 1
      }
    ]);
  });

  it('create method should add an order', async () => {
    const result = await orderStore.create({
      status: 'On Hold',
      user_id: 1
    });
    expect(result).toEqual({
      id: 2,
      status: 'On Hold',
      user_id: 1
    });
  });

  it('show method should return the specified order', async () => {
    const result = await orderStore.show('2');
    expect(result).toEqual({
      id: 2,
      status: 'On Hold', 
      user_id: 1
    });
  });
});