import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product ${id}: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create product ${product.name}: ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE products SET name = ($1), price = ($2) WHERE id = ($3) RETURNING *';
      const result = await conn.query(sql, [product.name, product.price, product.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update product ${product.id}: ${err}`);
    }
  }

  async delete(id: string) {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete product ${id}: ${err}`);
    }
  }
}