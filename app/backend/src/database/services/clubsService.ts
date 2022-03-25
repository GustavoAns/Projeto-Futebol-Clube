// import fs = require('fs/promises');
// import jwt = require('jsonwebtoken');
// import bcrypt = require('bcrypt');
import { Service } from 'typedi';
// import { LoginReturn, LoginBody } from '../interfaces/login';
import Club from '../models/Club';
// import { ErrorMessages } from '../enuns';
// import { ErrorMessages } from '../../../jwt.evaluation.key';

@Service()
export default class ClubsService {
  static async getAllClubs() {
    const findUser = await Club.findAll();
    // const findUser = { meessage: 'WIP' };
    if (findUser) {
      return { loginReturn: findUser, status: 200 };
    }
  }

  static async getById(id: number) {
    const findUser = await Club.findOne({ where: { id } });
    // const findUser = { meessage: 'WIP' };
    if (findUser) {
      return { loginReturn: findUser, status: 200 };
    }
  }
}
