import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import verifyAuthToken from '../middleware/verifyAuthToken';

const queries = new DashboardQueries();

const topFiveProducts = async(_req: Request, res: Response): Promise<void> => {
  try {
    const products = await queries.topFiveProducts();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const currentOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentOrders = await queries.currentOrdersByUser(req.params.id);
    res.json(currentOrders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const completedOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const completedOrders = await queries.completedOrdersByUser(req.params.id);
    res.json(completedOrders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/top-five-products', topFiveProducts);
  app.get('/current-orders-by-user/:id', verifyAuthToken, currentOrdersByUser);
  app.get('/completed-orders-by-user/:id', verifyAuthToken, completedOrdersByUser);
}

export default dashboardRoutes;
