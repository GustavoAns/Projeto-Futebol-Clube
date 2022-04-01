import * as express from 'express';
// import Container from 'typedi';
import LeaderboardConroller from '../controller/leaderboardConroller';

const route = express.Router();

route.get('/', async (req, res) => {
  const result = await LeaderboardConroller.getAll();
  if (result) return res.status(result.Status).json(result.loginReturn);
});

export default route;
