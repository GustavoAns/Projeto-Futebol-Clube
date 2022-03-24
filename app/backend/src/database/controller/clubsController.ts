import { Service } from 'typedi';
// import { LoginBody } from '../interfaces/login';
import ClubsService from '../services/ClubsService';
// import { Status } from '../enuns';

@Service()
export default class ClubsController {
  static async getAllClubs() {
    const validReturn = await ClubsService.getAllClubs();
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }
}
