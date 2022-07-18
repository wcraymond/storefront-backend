import client from '../../src/database';

// Used to test dashboard queries
export class DatabaseTestHelper {
  async addTestUsers(): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users (id, username, first_name, last_name, password) VALUES (101, 'testuser', 'Test', 'User', '$2b$10$qKlg.dsQNSACBgN09JZG.O43fh4AufE1tCgg4.fh375rYi4vlU4KW');`;
      await conn.query(sql);
    } catch (err) {
      throw new Error(`Could not add test users: ${err}`);
    }
  }
  async addTestProducts(): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products (id, name, price, category) VALUES (101, 'Product #1', '10', 'New Products');
                   INSERT INTO products (id, name, price, category) VALUES (102, 'Product #2', '10', 'New Products');
                   INSERT INTO products (id, name, price, category) VALUES (103, 'Product #3', '10', 'New Products');
                   INSERT INTO products (id, name, price, category) VALUES (104, 'Product #4', '10', 'Old Products');
                   INSERT INTO products (id, name, price, category) VALUES (105, 'Product #5', '10', 'Old Products');`
      await conn.query(sql);
    } catch (err) {
      throw new Error(`Cannot add test products: ${err}`);
    }
  }

  async addTestOrders(): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders (id, status, user_id) VALUES (101, 'Completed', 101);
                   INSERT INTO orders (id, status, user_id) VALUES (102, 'Completed', 101);
                   INSERT INTO orders (id, status, user_id) VALUES (103, 'Completed', 101);
                   INSERT INTO orders (id, status, user_id) VALUES (104, 'Processing', 101);
                   INSERT INTO orders (id, status, user_id) VALUES (105, 'Processing', 101);`;
      await conn.query(sql);
    } catch (err) {
      throw new Error(`Could not add test orders: ${err}`);
    }
  }

  async addTestOrderProducts(): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES (1, 101, 101);
                   INSERT INTO order_products (quantity, order_id, product_id) VALUES (2, 102, 102);
                   INSERT INTO order_products (quantity, order_id, product_id) VALUES (3, 103, 103);
                   INSERT INTO order_products (quantity, order_id, product_id) VALUES (4, 104, 104);
                   INSERT INTO order_products (quantity, order_id, product_id) VALUES (5, 105, 105);`;
      await conn.query(sql);
    } catch (err) {
      throw new Error(`Could not add test oder products: ${err}`);
    }
  }
}