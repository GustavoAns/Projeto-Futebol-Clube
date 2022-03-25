import * as express from 'express';
// import Container from 'typedi';
import ClubsController from '../controller/clubsController';

const route = express.Router();

route.get('/', async (_req, res) => {
  const result = await ClubsController.getAllClubs();
  if (result) return res.status(result.Status).json(result.loginReturn);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const idNumb = Number(id);
  const result = await ClubsController.getById(idNumb);
  if (result) return res.status(result.Status).json(result.loginReturn);
});

export default route;
