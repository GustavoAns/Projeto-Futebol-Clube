import { Service } from 'typedi';
// import { LoginBody } from '../interfaces/login';
import ClubsService from '../services/clubsService';
// import { Status } from '../enuns';

@Service()
export default class ClubsController {
  static async getAllClubs() {
    const validReturn = await ClubsService.getAllClubs();
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }

  static async getById(id: number) {
    const validReturn = await ClubsService.getById(id);
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }
}
