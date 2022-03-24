import { Service } from 'typedi';
import { LoginBody, ReturnMessageStatus } from '../interfaces/login';
import { ErrorMessages, Status } from '../enuns';

@Service()
export default class LoginValidate {
  static async loginBody(body: LoginBody): Promise<ReturnMessageStatus> {
    const { email, password } = body;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email === undefined || password === undefined
      || email.length === 0 || password.length === 0) {
      return {
        message: ErrorMessages.ERROR_FIELDS,
        status: Status.UNAUTHORIZED,
      };
    }
    if (regex.test(email)) {
      return { message: ErrorMessages.NO_ERROR, status: Status.OK };
    }
    return {
      message: ErrorMessages.ERROR_LOGIN,
      status: Status.UNAUTHORIZED,
    };
  }
}
