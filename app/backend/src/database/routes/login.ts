import * as express from 'express';
// import Container from 'typedi';
import LoginController from '../controller/loginController';

const route = express.Router();

route.post('/', async (req, res) => {
  const result = await LoginController.login(req.body);
  if (result) return res.status(result.Status).json(result.loginReturn);
});

export default route;
