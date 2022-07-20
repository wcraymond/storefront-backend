import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      id: parseInt(req.params.id),
      status: req.body.status,
      user_id: req.body.user_id
    };
    const updatedOrder = await store.update(order);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedOrder = await store.delete(req.params.id);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const orderRoutes = (app: express.Application): void => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, destroy);
}

export default orderRoutes;
