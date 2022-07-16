import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    jwt.verify(token as string, process.env.TOKEN_SECRET as string)
    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied: Invalid token');
  }
}

export default verifyAuthToken;
