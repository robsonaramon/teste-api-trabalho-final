const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app')
require('dotenv').config();

describe('Testes exceção no cadastro de Pokémon', ()=> {
    const cadastro = require ('../fixture/request/pokemon/insertPokemonWhitErrors.json');
    it('Apresentar a mensagem ao não informar o token', async()=> {
        const resposta = await request(process.env.BASE_URL_REST)
            .post('/api/pokemon')
            .send(cadastro);

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('erro').that.equals('Token não fornecido.'); 
    });
});