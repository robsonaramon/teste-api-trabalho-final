const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');


const app = require('../../../app');
const pokemonService = require('../../../service/pokemonService');

describe('Testes de cadastro de Pokémon', () => {
    before(async () => {
        const postLogin = require('../fixture/request/login/login.json');
        
        const retornoLogin = await request(app)
            .post('/api/auth/login')
            .send(postLogin);
        
        token = retornoLogin.body.token;
    });

    it('Adicionar um pokémon com sucesso', async () => {
        const pokemonServiceMock = sinon.stub(pokemonService, 'createPokemon');
        pokemonServiceMock.returns({
                name: "Pikachu",
                type: "Elétrico",
                number: 25
        });

        const resposta = await request(app)
            .post('/api/pokemon')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Pikachu",
                type: "Elétrico",
                number: 25
            });

        expect(resposta.status).to.equal(201);
        const respostaEsperada = require('../fixture/response/pokemon/postPokemon.json');
        expect(resposta.body).to.deep.equal(respostaEsperada);
    });

    it('Retornar o código 400 quando adicionar um pokémon que já está cadastrado', async () => {
            const pokemonServiceMock = sinon.stub(pokemonService, 'createPokemon');
            pokemonServiceMock.throws(new Error('Nome do Pokémon já cadastrado.'));


            const resposta = await request(app)
                .post('/api/pokemon')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "Bulbasaur",
                    type: "Grama",
                    number: 25
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('erro', 'Nome do Pokémon já cadastrado.');
        });
        
    afterEach(() => {
        sinon.restore();
    });
});