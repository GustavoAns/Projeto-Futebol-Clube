import * as express from 'express';
import login from './login';
import clubs from './clubs';
import matchs from './matchs';
import leaderboard from './leaderboard';

const route = express.Router();

route.use('/login', login);
route.use('/clubs', clubs);
route.use('/matchs', matchs);
route.use('/leaderboard', leaderboard);

export default route;
