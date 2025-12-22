import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { BASE_URL } from './helpers/baseURL.js';
import { register } from './helpers/register.js';
import { login } from './helpers/login.js';
import { Trend } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';
import faker from "k6/x/faker"


const postRegisterUserDurationTrend = new Trend ('post_register_user_duration');
const postLoginDurationTrend = new Trend ('post_login_duration');
const postRegisterPokemonDurationTrend = new Trend ('post_register_pokemon_duration');

export const options = {
    thresholds: {
        http_req_duration: ['p(90)<=2000', 'p(95)<=3000'],
        http_req_failed: ['rate<0.01']
    },
    stages: [
        { duration: '3s', target: 10 },
        { duration: '5s', target: 5 },
        { duration: '15s', target: 15 },
        { duration: '7s', target: 2 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 0 },
    ],
};

const pokemons = new SharedArray('pokemons', function (){
    return JSON.parse(open('./data/pokemon.test.data.json'));
})

export default function() {
    let token = '';
    let username, email, password;
    const pokemon = pokemons[ exec.scenario.iterationInTest % pokemons.length ];


    group('Fazer cadastro do usuário', function (){
        username = faker.person.firstName();
        email = faker.person.email();
        password = faker.internet.password();
        let res = register(username, email, password)
        
        check(res, {
            'status do cadastro deve ser igual a 201': (res) => res.status === 201,
            'mensagem do cadastro deve ser de sucesso': (res) => res.json('mensagem')?.includes('sucesso')
        });
        
        postRegisterUserDurationTrend.add(res.timings.duration);
    });

    group('Fazer login do usuário', function () {
        let res = login(email, password)
        
        check(res, {
            'status do login deve ser igual a 200': (res) => res.status === 200,
            'mensagem do login deve ser de sucesso': (res) => res.json('mensagem')?.includes('sucesso'),
            'login retorna o token': (res) => !!res.json('token')
        });

        token = res.json('token');

        postLoginDurationTrend.add(res.timings.duration);
    });

    group('Cadastrar um Pokémon', function (){
        let res = http.post(`${BASE_URL}/api/pokemon`,
            JSON.stringify({
                name: pokemon.name,
                type: pokemon.type,
                number: pokemon.number
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    
        check(res, {
            'status do cadastro do Pokémon ser igual a 201': (res) => res.status === 201,
            'mensagem do cadastro do Pokémon deve ser de sucesso': (res) => res.json('mensagem')?.includes('sucesso')
        });

        postRegisterPokemonDurationTrend.add(res.timings.duration);
    })
    
    group('Simular o pensamento do usuário', function ()  {
        sleep(1);
    });
}