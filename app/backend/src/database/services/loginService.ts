import fs = require('fs/promises');
import jwt = require('jsonwebtoken');
import { Service } from 'typedi';
import { LoginReturn, LoginBody } from '../interfaces/login';
import User from '../models/User';
import { ErrorMessages } from '../enuns';
// import { ErrorMessages } from '../../../jwt.evaluation.key';

@Service()
export default class LoginService {
  static async creatLoginReturn(findUser: User): Promise<LoginReturn> {
    const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
    const token = await jwt.sign({ ...findUser }, senhaSecreta, { expiresIn: '24h' });
    return {
      loginReturn: {
        user: {
          id: findUser.id,
          username: findUser.username,
          role: findUser.role,
          email: findUser.email,
        },
        token,
      },
      Status: 200,
    };
  }

  static async login(loginBody: LoginBody): Promise<LoginReturn> {
    const findUser = await User.findOne({ where: { email: loginBody.email } });
    if (!findUser) {
      return { loginReturn: { message: ErrorMessages.ERROR_LOGIN }, Status: 401 };
    }
    const { password } = findUser;
    console.log(password);
    console.log(loginBody.password);
    if (password !== loginBody.password) {
      return { loginReturn: { message: ErrorMessages.ERROR_LOGIN }, Status: 401 };
    }
    return this.creatLoginReturn(findUser);
  }
}
