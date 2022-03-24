import * as express from 'express';
import login from './login';
import clubs from './clubs';

const route = express.Router();

route.use('/login', login);
route.use('/clubs', clubs);

export default route;
