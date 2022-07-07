import { ProductStore } from '../../../../src/models/product';

const productStore = new ProductStore();

describe('Product model', () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });
  
  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productStore.delete).toBeDefined();
  });

  it('index method should list all products', async () => {
    const result = await productStore.index();
    expect(result).toEqual([]);
  });

  it('create method should add a product', async () => {
    const result = await productStore.create({
      name: 'Test Product',
      price: 100
    });
    expect(result).toEqual({
      id: 1,
      name: 'Test Product', 
      price: 100
    });
  });

  it('show method should return the specified product', async () => {
    const result = await productStore.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'Test Product',
      price: 100
    });
  });

  it('update method should update a product', async () => {
    const result = await productStore.update({
      id: 1,
      name: 'Updated Name',
      price: 200
    });
    expect(result).toEqual({
      id: 1,
      name: 'Updated Name',
      price: 200
    });
  });

  it('delete method should remove a product', async () => {
    await productStore.delete('1');
    const result = await productStore.index();
    expect(result).toEqual([]);
  });
});