// import fs = require('fs/promises');
// import jwt = require('jsonwebtoken');
// import bcrypt = require('bcrypt');
import { Service } from 'typedi';
import { MatchsReq, MatchsRes, Teams } from '../interfaces/matchs';
import Match from '../models/Match';
import Club from '../models/Club';
// import { ErrorMessages } from '../enuns';
// import { ErrorMessages } from '../../../jwt.evaluation.key';

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
export default class MatchsService {
  static async getAllMatchs(inProgress: string) {
    const findMatchs = await Match.findAll({ include: homeAndAwayClub });
    if (findMatchs) {
      const filtredMatchs = findMatchs.filter((objMeta) => {
        if (inProgress === 'true') return objMeta.inProgress === true;
        return objMeta.inProgress === false;
      });
      // console.log(filtredMatchs);
      if (inProgress === 'nada') return { loginReturn: findMatchs, status: 200 };
      const newArray: MatchsRes[] = [];
      filtredMatchs.forEach((match) => {
        const newObj = this.createObj(match);
        newArray.push(newObj);
      });
      return { loginReturn: newArray, status: 200 };
    }
  }

  static async addMatch(obj: MatchsReq) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = obj;
    const msgSameTeam = 'It is not possible to create a match with two equal teams';
    const notFound = 'There is no team with such id!';
    console.log(homeTeam === awayTeam);
    if (homeTeam === awayTeam) { return { loginReturn: { message: msgSameTeam }, status: 401 }; }
    const bool = await this.validClub({ homeTeam, awayTeam });
    if (bool) return { loginReturn: { message: notFound }, status: 401 };
    const findMatchs = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    if (findMatchs) {
      const { id } = findMatchs;
      const matchResponse = { id, ...obj };
      return { loginReturn: matchResponse, status: 201 };
    }
  }

  // static createObj2(match: any) {
  //   const { homeTeam, homeTeamGoals, awayTeam,
  //     awayTeamGoals, inProgress } = match;
  //   const newObj = {
  //     homeTeam,
  //     homeTeamGoals,
  //     awayTeam,
  //     awayTeamGoals,
  //     inProgress,
  //   };
  //   console.log(match.inProgress);
  //   if (match.inProgress === 1) {
  //     return { ...newObj, inProgress: true };
  //   }
  //   return { ...newObj, inProgress: false };
  // }

  static createObj(match: any): MatchsRes {
    const { id, homeTeam, homeTeamGoals, awayTeam,
      awayTeamGoals, inProgress, homeClub, awayClub } = match;
    const newObj = { id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
      homeClub,
      awayClub,
    };
    return newObj;
  }

  static async validClub(teams: Teams) {
    const { homeTeam, awayTeam } = teams;
    const team1 = await Club.findOne({ where: { id: homeTeam } });
    const team2 = await Club.findOne({ where: { id: awayTeam } });
    if ((team1 !== undefined && team1 !== null) && (team2 !== undefined && team2 !== null)) {
      return false;
    }
    return true;
  }

  static async editMatch(homeTeamGoals: number, awayTeamGoals: number, id:number) {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { loginReturn: { message: `A partida com id ${id} foi atualizada.` }, status: 200 };
  }

  static async validInProgress(id:number) {
    const result = await Match.findOne({ where: { id } });
    if (!result) return false;
    if (result.inProgress === true) {
      return true;
    }
    return false;
  }

  static async finishMatch(id: number) {
    await Match.update({ inProgress: false }, { where: { id } });
    return { loginReturn: { message: `A partida com id ${id} foi finalizada` }, status: 200 };
  }
}
