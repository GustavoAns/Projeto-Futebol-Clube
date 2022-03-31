import * as express from 'express';
// import Container from 'typedi';
import LoginController from '../controller/loginController';

const route = express.Router();

route.post('/', async (req, res) => {
  const result = await LoginController.login(req.body);
  if (result) return res.status(result.Status).json(result.loginReturn);
});

route.get('/validate', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json('Enter the authentication token');
  const result = await LoginController.validate(authorization);
  if (result) return res.status(result.Status).json(result.loginReturn);
});

export default route;
