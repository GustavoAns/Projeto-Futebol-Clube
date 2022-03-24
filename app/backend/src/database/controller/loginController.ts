import { Service } from 'typedi';
import { LoginBody } from '../interfaces/login';
import LoginService from '../services/loginService';
import LoginValidate from '../validations/loginValidate';
import { Status } from '../enuns';

@Service()
export default class LoginController {
  static async login(loginBody: LoginBody) {
    const validReturn = await LoginValidate.loginBody(loginBody);
    if (validReturn.status === Status.OK) {
      const loginReturn = LoginService.login(loginBody);
      return loginReturn;
    }
    return { loginReturn: { message: validReturn.message }, Status: validReturn.status };
  }

  static async validate(token: string) {
    const userRole = await LoginValidate.validToken(token);
    if (userRole !== undefined) return { loginReturn: userRole, Status: 200 };
    return { loginReturn: { message: 'Token invalid' }, Status: 402 };
  }
}
