const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app')
require('dotenv').config();

describe('Testes de atualização do nome do Pokémon', ()=> {
    before(async()=> {
        const login = require('../fixture/request/login/login.json')
        const resposta = await request(app)
            .post('/api/auth/login')
            .send(login);
        
        token = resposta.body.token;
    });
    
    it('Atualizar com sucesso o nome do Pokémon', async()=> {
        const atualizacao = require('../fixture/request/pokemon/updateLoggedIn.json');
        const resposta = await request(process.env.BASE_URL_REST)
            .put(`/api/pokemon/${uuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(atualizacao)

            expect(resposta.status).to.equal(200);
            respostaEsperada = (require('../fixture/response/pokemon/responseUpdateLoggedIn.json'));
            expect(resposta.body).excluding('uuid').to.deep.equal(respostaEsperada);
    })
});