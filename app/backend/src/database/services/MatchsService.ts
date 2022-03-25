// import fs = require('fs/promises');
// import jwt = require('jsonwebtoken');
// import bcrypt = require('bcrypt');
import { Service } from 'typedi';
// import { LoginReturn, LoginBody } from '../interfaces/login';
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
  static async getAllMatchs() {
    const findMatchs = await Match.findAll({ include: homeAndAwayClub });
    if (findMatchs) {
      return { loginReturn: findMatchs, status: 200 };
    }
  }
}
