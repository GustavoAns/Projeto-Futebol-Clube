import * as sinon from "sinon";
import * as chai from "chai";
import jwt = require("jsonwebtoken");
import fs = require("fs/promises");
import chaiHttp = require("chai-http");
import { MatchsRes } from "../database/interfaces/matchs";

import { app } from "../app";
import Match from "../database/models/Match";
import matchsMocked = require("./mocks/Matchs.json");
import usersMocked = require('./mocks/Users.json');
import { FindOptions } from "sequelize/types";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa a rota /matchs", () => {
  describe("Quando é feito um get.", () => {
    let chaiHttpResponse: Response;

    before(async () => {
      return sinon.stub(Match, "findAll").resolves(matchsMocked as any);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
    it("Deve ser retornado todos as partidas com StatusCode: 200", async () => {
      chaiHttpResponse = await chai.request(app).get("/matchs");
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchsMocked);
    });
  });

  describe("Quando é feito um get /matchs?inProgress=true.", () => {
    let chaiHttpResponse: Response;

    before(async () => {
      return sinon.stub(Match, "findAll").resolves(matchsMocked as any);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
    it("Deve ser retornado todos as partidas em andamento com StatusCode: 200", async () => {
      chaiHttpResponse = await chai.request(app).get("/matchs?inProgress=true");
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([matchsMocked[4], matchsMocked[5]]);
    });
  });

  describe("Quando é feito um get /matchs?inProgress=false.", () => {
    let chaiHttpResponse: Response;

    before(async () => {
      return sinon.stub(Match, "findAll").resolves(matchsMocked as any);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
    it("Deve ser retornado todos as partidas finalizadas com StatusCode: 200", async () => {
      chaiHttpResponse = await chai.request(app).get("/matchs?inProgress=false");
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([matchsMocked[0], matchsMocked[1], matchsMocked[2], matchsMocked[3]]);
    });
  });

  describe('Quando é feito um post', () => {
    let chaiHttpResponse: Response;
    const request = {
      homeTeam: 4,
      awayTeam: 7,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
      inProgress: true 
    }
    const response = {
      id: 7,
      homeTeam: 4,
      homeTeamGoals: 2,
      awayTeam: 7,
      awayTeamGoals: 1,
      inProgress: true,
    } 

    before(async () => {
      sinon.stub(Match, "create").resolves({ id: 7 } as any);
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })

    it('Deve ser retornado as mudanças feitas.', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).post('/matchs').set('Authorization', authorization).send(request);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(response);
    });
  });

  describe('Quando é feito um post sem Authorization', () => {
    let chaiHttpResponse: Response;
    const request = {
      homeTeam: 4,
      awayTeam: 7,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
      inProgress: true 
    }

    before(async () => {
      sinon.stub(Match, "create").resolves({ id: 7 } as any);
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })

    it('Deve ser retornada a msg "Enter the authentication token"', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).post('/matchs').send(request);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal('Enter the authentication token');
    });
  });

  describe('Quando é feito um patch.', () => {
    let chaiHttpResponse: Response;
    
    const response = {
      message: 'A partida com id 5 foi atualizada.'
    }

    const request = {
      homeTeamGoals: 3,
      awayTeamGoals: 1
    } 

    before(async () => {
      sinon.stub(Match, "findOne").resolves(matchsMocked[4] as any);
    });

    after(()=>{
      (Match.findOne as sinon.SinonStub).restore();
    })

    it('Deve ser retornada a msg "A partida com id 5 foi atualizada.".', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).patch('/matchs/5').set('Authorization', authorization).send(request);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(response);
    });
  });

  describe('Quando é feito um patch em uma partida encerrada', () => {
    let chaiHttpResponse: Response;
    
    const response = {
      message: 'A partida não esta mais em progresso.'
    }

    const request = {
      homeTeamGoals: 3,
      awayTeamGoals: 1
    } 

    before(async () => {
      sinon.stub(Match, "findOne").resolves(matchsMocked[0] as any);
    });

    after(()=>{
      (Match.findOne as sinon.SinonStub).restore();
    })

    it('Deve ser retornada a msg "A partida não esta mais em progresso.".', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).patch('/matchs/1').set('Authorization', authorization).send(request);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(response);
    });
  });

  describe('Quando é feito um patch sem Authorization', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Match, "update").resolves();
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('Deve ser retornada a msg "Enter the authentication token".', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).patch('/matchs/1');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal('Enter the authentication token');
    });
  });

  describe('Quando é feito um patch /:id/finish', () => {
    let chaiHttpResponse: Response;

    const response = {
      message: 'A partida com id 5 foi finalizada'
    }

    before(async () => {
      sinon.stub(Match, "update").resolves();
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('Deve ser retornada a msg "A partida com id 5 foi finalizada".', async () => {
      const { id, username, role, email } = usersMocked[0];
      const senhaSecreta = await fs.readFile('./jwt.evaluation.key', 'utf8');
      const authorization = await jwt.sign({ id, username, role, email }, senhaSecreta, { expiresIn: '24h' }),
      chaiHttpResponse = await chai.request(app).patch('/matchs/5/finish').set('Authorization', authorization);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(response);
    });
  });
});
