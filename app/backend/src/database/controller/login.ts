import { Request, Response } from 'express';
import * as loginService from '../services/login';

export default async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const users: any = await loginService.login(email, password);
  res.status(users.status).json(users.holder);
}
