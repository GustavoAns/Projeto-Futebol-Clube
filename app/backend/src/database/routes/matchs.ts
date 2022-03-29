import * as express from 'express';
// import Container from 'typedi';
import MatchsController from '../controller/matchsController';
import MatchsValidate from '../validations/matchsValidate';

const route = express.Router();

const msg = 'Enter the authentication token';

route.get('/', async (req, res) => {
  const { inProgress } = req.query;
  let a = 'nada';
  if (inProgress) a = inProgress as string;
  const result = await MatchsController.getAllMatchs(a);
  if (result) return res.status(result.Status).json(result.loginReturn);
});

route.post('/', async (req, res) => {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  let { inProgress } = req.body;
  if (!inProgress) inProgress = true;
  if (!authorization) return res.status(401).json(msg);
  const bool = await MatchsValidate.validToken(authorization);
  if (bool === true) {
    const obj = { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
    const result = await MatchsController.addMatch(obj);
    if (result) return res.status(result.Status).json(result.loginReturn);
  }
  return res.status(401).json({ message: 'Invalid Token' });
});

route.patch('/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const idNum = Number(id);
  if (!authorization) return res.status(401).json(msg);
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const result = await MatchsController.editMatch(homeTeamGoals, awayTeamGoals, idNum);
  if (result) return res.status(result.Status).json(result.loginReturn);
});

route.patch('/:id/finish', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const idNum = Number(id);
  if (!authorization) return res.status(401).json(msg);
  const result = await MatchsController.finishMatch(idNum);
  if (result) return res.status(result.Status).json(result.loginReturn);
  return res.status(401).json({ message: 'Invalid ID' });
});
export default route;
