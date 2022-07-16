import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get Order ${id}: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add order: ${err}`);
    }
  }
}