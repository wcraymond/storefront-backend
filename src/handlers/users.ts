import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };
    const newUser = await store.create(user);
    // Sign JWT
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  try {
    const authenticatedUser = await store.authenticate(username, password);
    const token = jwt.sign({ user: authenticatedUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', verifyAuthToken, create);
  app.post('/users/authenticate', authenticate);
}

export default userRoutes;
