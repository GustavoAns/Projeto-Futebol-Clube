import fs = require('fs/promises');
import jwt = require('jsonwebtoken');
import * as bcrypt from 'bcryptjs';
import { Service } from 'typedi';
import { LoginReturn, LoginBody } from '../interfaces/login';
import User from '../models/User';
import { ErrorMessages } from '../enuns';
// import { ErrorMessages } from '../../../jwt.evaluation.key';

@Service()
export default class LoginService {
  static async creatLoginReturn(findUser: User): Promise<LoginReturn> {
    const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
    const user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      email: findUser.email,
    };
    const token = await jwt.sign({ ...user }, senhaSecreta, { expiresIn: '24h' });
    return {
      loginReturn: {
        user,
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
    const isValid = await bcrypt.compare(loginBody.password, password);
    if (!isValid) {
      return { loginReturn: { message: ErrorMessages.ERROR_LOGIN }, Status: 401 };
    }
    return this.creatLoginReturn(findUser);
  }
}
