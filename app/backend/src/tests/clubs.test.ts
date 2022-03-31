import * as sinon from 'sinon';
import * as chai from 'chai';
import jwt = require('jsonwebtoken');
import fs = require('fs/promises');
import chaiHttp = require('chai-http');
// import { UserToken } from '../database/interfaces/login';

import { app } from '../app';
import Club from '../database/models/Club';
import clubsMocked = require('./mocks/Club.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /clubs', () => {
  describe('Quando é feito um get.', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Club, "findAll").resolves(clubsMocked as Club[]);
    });

    after(()=>{
      (Club.findAll as sinon.SinonStub).restore();
    })
    it('Deve ser retornado todos os clubs com StatusCode: 200', async () => { 
      chaiHttpResponse = await chai.request(app).get('/clubs');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(clubsMocked);
    }); 
  });

  describe('Quando é feito um get/:id.', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Club, "findOne").resolves(clubsMocked[0] as Club);
    });

    after(()=>{
      (Club.findOne as sinon.SinonStub).restore();
    })
    it('Deve ser retornado todos os clubs com StatusCode: 200', async () => { 
      chaiHttpResponse = await chai.request(app).get('/clubs/1');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(clubsMocked[0]);
    }); 
  });
});
