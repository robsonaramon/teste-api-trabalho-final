const request = require('supertest');
const { expect } = require('chai');
const { pokemon } = require('../../../service/pokemonService');

require('dotenv').config();

describe('Testes de exceção na atualização do nome do Pokémon', () => {
    before(async()=> {
        const login = require('../fixture/request/login/login.json')
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(login);
        
        token = resposta.body.data.login.token;
    });

    const testeAtualizacaoLogado = require('../fixture/request/pokemon/updateLoggedInWithErrors.json');
    testeAtualizacaoLogado.forEach(atualizacao => {
        it(`Apresentar a mensagem de ${atualizacao.nomeTeste}`, async()=> {
            const respostaAtualizacao = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(atualizacao.update);

            expect(respostaAtualizacao.status).to.equal(200);
            expect(respostaAtualizacao.body.errors[0].message).to.equal(atualizacao.mensagemEsperada);
        });
    });
});