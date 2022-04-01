import { Service } from 'typedi';
// import { LoginBody } from '../interfaces/login';
import LeaderboardService from '../services/leaderboardService';
// import LoginValidate from '../validations/loginValidate';

@Service()
export default class LeaderboardConroller {
  static async getAll() {
    const allClubs = await LeaderboardService.getAllClubs();
    const acumulador: object[] = [];
    await Promise.all(
      await allClubs.map(async (clubName: string) => {
        const teamInfo = await LeaderboardService.gerateBoardInfo(clubName);
        return acumulador.push(teamInfo);
      }),
    );
    const sortedCumulaor = acumulador.sort((a: any, b: any) => {
      const totalPoints = b.totalPoints - a.totalPoints;
      if (totalPoints !== 0) return totalPoints;
      const goalsBalance = b.goalsBalance - a.goalsBalance;
      if (goalsBalance !== 0) return goalsBalance;
      const goalsFavor = b.goalsFavor - a.goalsFavor;
      if (goalsFavor !== 0) return goalsFavor;
      return b.goalsOwn - a.goalsOwn;
    });
    if (allClubs) return { loginReturn: sortedCumulaor, Status: 200 };
  }
}
