import * as express from 'express';
import login from './login';

const route = express.Router();

route.use('/login', login);

export default route;
