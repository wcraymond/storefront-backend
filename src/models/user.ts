import client from '../database';

export type User = {
  id?: number,
  first_name: string,
  last_name: string,
  password: string
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get User: ${id}: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [user.first_name, user.last_name, user.password]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add user ${user.first_name} ${user.last_name}: ${err}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE users SET first_name = ($1), last_name = ($2), password = ($3) WHERE id = ($4) RETURNING *';
      const result = await conn.query(sql, [user.first_name, user.last_name, user.password, user.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update user ${user.id}: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete user ${id}: ${err}`);
    }
  }
}