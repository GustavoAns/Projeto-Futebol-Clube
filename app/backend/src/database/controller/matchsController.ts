import { Service } from 'typedi';
// import { LoginBody } from '../interfaces/login';
import MatchsService from '../services/MatchsService';
// import { Status } from '../enuns';

@Service()
export default class MatchsController {
  static async getAllMatchs() {
    const validReturn = await MatchsService.getAllMatchs();
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }
}
