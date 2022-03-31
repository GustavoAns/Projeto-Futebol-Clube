import * as sinon from 'sinon';
import * as chai from 'chai';
import jwt = require('jsonwebtoken');
import fs = require('fs/promises');
import chaiHttp = require('chai-http');
import { ErrorMessages } from '../database/enuns';
import { UserToken } from '../database/interfaces/login';

import { app } from '../app';
import User from '../database/models/User';
import usersMocked = require('./mocks/Users.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  describe('Quando não é passado o email no corpo da requisicao.', () => {
    let chaiHttpResponse: Response;
    const body = { password: '123456' };
    const erroMessage = { message: ErrorMessages.ERROR_FIELDS };
    it('Deve ser retornado uma message "All fields must be filled" com StatusCode: 401', async () => { 
      chaiHttpResponse = await chai.request(app).post('/login').send(body);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(erroMessage);
    });
  });

  describe('Quando não é passado a senha no corpo da requisicao.', () => {
    let chaiHttpResponse: Response;
    const body = { email: 'admin@admin.com' };
    const erroMessage = { message: ErrorMessages.ERROR_FIELDS };
    it('Deve ser retornado uma message "All fields must be filled" com StatusCode: 401', async () => { 
      chaiHttpResponse = await chai.request(app).post('/login').send(body);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(erroMessage);
    });
  });

  describe('Quando é passado um email invalido no corpo da requisicao.', () => {
    let chaiHttpResponse: Response;
    const body = { email: 'adminadmincom', password: '123456' };
    const erroMessage = { message: ErrorMessages.ERROR_LOGIN };
    it('Deve ser retornado uma message "Incorrect email or password" com StatusCode: 401', async () => { 
      chaiHttpResponse = await chai.request(app).post('/login').send(body);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(erroMessage);
    }); 
  });

  describe('Quando é passado uma senha invalida no corpo da requisicao.', () => {
    let chaiHttpResponse: Response;
    const body = { email: 'admin@admin.com', password: '123456' };
    const erroMessage = { message: ErrorMessages.ERROR_LOGIN };

    before(async () => {
      sinon.stub(User, "findOne").resolves(usersMocked[0] as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Deve ser retornado uma message "Incorrect email or password" com StatusCode: 401', async () => { 
      chaiHttpResponse = await chai.request(app).post('/login').send(body);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(erroMessage);
    }); 
  });
  
  describe('Quando é passado o e-mail e a senha corretos', () => {
    let chaiHttpResponse: Response;
    let response: UserToken;

    const body = { email: 'admin@admin.com', password: 'secret_admin' };

    before(async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      response = {
        user: { id, username, role, email },
        token: await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      };
      sinon.stub(User, "findOne").resolves(usersMocked[0] as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Deve ser retornado uma usuario e um token com StatusCode: 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.user).to.be.deep.equal(response.user);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('/validate | Quando é passado um token para verificar.', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(usersMocked[0] as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Deve ser retornado o cargo do usuario.', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', authorization);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(role);
    });
  });
});
