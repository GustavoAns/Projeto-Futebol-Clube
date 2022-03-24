import * as express from 'express';
// import Container from 'typedi';
import ClubsController from '../controller/clubsController';

const route = express.Router();

route.get('/', async (req, res) => {
  const result = await ClubsController.getAllClubs();
  if (result) return res.status(result.Status).json(result.loginReturn);
});

export default route;
