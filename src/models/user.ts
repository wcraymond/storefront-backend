import client from '../database';
import bcrypt from 'bcrypt';

const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
const pepper: string = process.env.BCRYPT_PASSWORD as string;

export type User = {
  id?: number,
  username: string,
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
      const sql = 'INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *';
      // Create password hash
      const hash = bcrypt.hashSync(
        user.password + pepper,
        saltRounds
      );
      const result = await conn.query(sql, [user.username, user.first_name, user.last_name, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add user ${user.first_name} ${user.last_name}: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, username, first_name, last_name, password FROM users WHERE username = ($1)';
      const result = await conn.query(sql, [username]);

      // Compare hash using bcrypt
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }

      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${username}: ${err}`);
    }
  }
}