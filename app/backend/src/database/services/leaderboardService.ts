import { Service } from 'typedi';
// import { MatchsRes } from '../interfaces/matchs';
import Club from '../models/Club';
import Match from '../models/Match';

const homeAndAwayClub = [
  {
    model: Club,
    as: 'homeClub',
    attributes: ['clubName'],
  },
  {
    model: Club,
    as: 'awayClub',
    attributes: ['clubName'],
  },
];

@Service()
export default class LeaderboardService {
  static async getAllClubs(): Promise<any> {
    const findClubs = await Club.findAll();
    const acumulador: string[] = [];
    findClubs.forEach((obj) => {
      acumulador.push(obj.clubName);
    });
    return acumulador;
  }

  static totalGame(obj: any, clubName: string): number {
    if (obj.homeClub.clubName === clubName) {
      return 1;
    }
    if (obj.awayClub.clubName === clubName) {
      return 1;
    }
    return 0;
  }

  static totalVictorie(obj: any, clubName: string): number {
    if (obj.homeClub.clubName === clubName && obj.homeTeamGoals > obj.awayTeamGoals) {
      return 1;
    }
    if (obj.awayClub.clubName === clubName && obj.awayTeamGoals > obj.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static totalDraw(obj: any, clubName: string): number {
    if (obj.homeClub.clubName === clubName && obj.homeTeamGoals === obj.awayTeamGoals) {
      return 1;
    }
    if (obj.awayClub.clubName === clubName && obj.awayTeamGoals === obj.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static totalLosse(obj: any, clubName: string): number {
    if (obj.homeClub.clubName === clubName && obj.homeTeamGoals < obj.awayTeamGoals) {
      return 1;
    }
    if (obj.awayClub.clubName === clubName && obj.awayTeamGoals < obj.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static goalsFav(obj: any, clubName: string): number {
    if (obj.homeClub.clubName === clubName) {
      return obj.homeTeamGoals as number;
    }
    if (obj.awayClub.clubName === clubName) {
      return obj.awayTeamGoals as number;
    }
    return 0;
  }

  static goalsOw(obj: any, clubName: string): number {
    if (obj.homeClub.clubName === clubName) {
      return obj.awayTeamGoals as number;
    }
    if (obj.awayClub.clubName === clubName) {
      return obj.homeTeamGoals as number;
    }
    return 0;
  }

  // eslint-disable-next-line max-lines-per-function
  static async gerateBoardInfo(clubName: string): Promise<any> {
    const findAllMatchs = await Match.findAll({ include: homeAndAwayClub });
    let totalGames = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    findAllMatchs.forEach((obj: any) => {
      if (obj.inProgress) return;
      totalVictories += this.totalVictorie(obj, clubName);
      goalsFavor += this.goalsFav(obj, clubName);
      totalGames += this.totalGame(obj, clubName);
      totalDraws += this.totalDraw(obj, clubName);
      totalLosses += this.totalLosse(obj, clubName);
      goalsOwn += this.goalsOw(obj, clubName);
    });
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    // eslint-disable-next-line max-len
    return { name: clubName, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };
  }
}
