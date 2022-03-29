import { Service } from 'typedi';
import { MatchsReq } from '../interfaces/matchs';
import MatchsService from '../services/MatchsService';
// import { Status } from '../enuns';

@Service()
export default class MatchsController {
  static async getAllMatchs(inProgress: string) {
    const validReturn = await MatchsService.getAllMatchs(inProgress);
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }

  static async addMatch(obj: MatchsReq) {
    const validReturn = await MatchsService.addMatch(obj);
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }

  static async editMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    const validInProgress = await MatchsService.validInProgress(id);
    if (validInProgress) {
      const validReturn = await MatchsService.editMatch(homeTeamGoals, awayTeamGoals, id);
      if (validReturn) {
        return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
      }
    }
    return { loginReturn: { message: 'A partida não esta mais em progresso.' }, Status: 401 };
  }

  static async finishMatch(id: number) {
    const validReturn = await MatchsService.finishMatch(id);
    if (validReturn) {
      return { loginReturn: validReturn.loginReturn, Status: validReturn.status };
    }
  }
}
