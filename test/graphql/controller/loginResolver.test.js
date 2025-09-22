const sinon = require('sinon');
const { expect } = require('chai');

const authService = require('../../../service/authService');
const userService = require('../../../service/userService');
const resolvers = require('../../../graphql/resolvers');
const loginResolver = resolvers.Mutation.login;

describe('Testes exceção no login', () => {

    beforeEach(() => {
        findByEmailMock = sinon.stub(userService, 'findUserByEmail');
        comparePasswordMock = sinon.stub(authService, 'comparePassword');
    });

    const testesErroLogin = require('../fixture/request/login/loginWithError.json');

    testesErroLogin.forEach(teste => {
        it(`Apresentar a mensagem de erro quando ${teste.nomeTeste}`, () => {
            findByEmailMock.returns(teste.usuario);
            comparePasswordMock.returns(teste.senhaCorreta);

            
            expect(() =>
                loginResolver({}, teste.loginInput, {})).to.throw(teste.mensagemEsperada);
        });
    });

    afterEach(() => {
        sinon.restore();
    });

});