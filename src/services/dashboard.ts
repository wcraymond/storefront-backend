import client from '../database';
import { Product } from '../models/product';
import { Order } from '../models/order';

export class DashboardQueries {
  async topFiveProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT p.id, p.name, p.price, p.category
                     FROM order_products op
                          INNER JOIN
                          products p ON op.product_id = p.id
                    GROUP BY p.id
                    ORDER BY SUM(op.quantity) DESC
                    LIMIT 5`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get top 5 most popular products: ${err}`);
    }
  }

  async currentOrdersByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT o.id, o.status, o.user_id
                     FROM orders o
                          INNER JOIN
                          users u ON o.user_id = u.id
                    WHERE o.status != 'Completed'
                      AND u.id = ($1)`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get current orders for user ${userId}: ${err}`);
    }
  }

  async completedOrdersByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT o.id, o.status, o.user_id
                     FROM orders o
                          INNER JOIN
                          users u ON o.user_id = u.id
                    WHERE o.status = 'Completed'
                      AND u.id = ($1)`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders for user ${userId}: ${err}`);
    }
  }
}