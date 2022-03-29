import { Service } from 'typedi';
import fs = require('fs/promises');
import jwt = require('jsonwebtoken');
// import { LoginBody, ReturnMessageStatus, RetornoJWT } from '../interfaces/login';
// import { ErrorMessages, Status } from '../enuns';

@Service()
export default class MatchsValidate {
  static async validToken(token: string): Promise<true | false> {
    const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
    try {
      jwt.verify(token, senhaSecreta);
      return true;
    } catch (_) {
      return false;
    }
  }
}
