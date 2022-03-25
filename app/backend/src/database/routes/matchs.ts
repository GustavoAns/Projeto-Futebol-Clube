import * as express from 'express';
// import Container from 'typedi';
import MatchsController from '../controller/matchsController';

const route = express.Router();

route.get('/', async (req, res) => {
  const result = await MatchsController.getAllMatchs();
  if (result) return res.status(result.Status).json(result.loginReturn);
});

export default route;
