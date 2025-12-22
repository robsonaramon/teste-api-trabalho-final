# Pokédex API - Projeto Final PGATS

API completa em JavaScript com Express que oferece endpoints REST e GraphQL para gerenciamento de usuários e Pokémon.

## Funcionalidades
- Autenticação com JWT
- Registro com e-mail único
- Cadastro, listagem, atualização e remoção de Pokémon
- Busca por nome, tipo ou número
- Documentação Swagger (REST) e GraphQL Playground

## Tecnologias Utilizadas
- Node.js
- Express
- Apollo Server
- JWT
- bcryptjs
- Swagger UI (JSON)
- UUID

## Pré-requisitos
- Node.js v14+
- npm ou yarn

## Instalação e Execução

```bash
git clone <url-do-repositorio>
cd pokedex-api
npm install
```

### Executar REST
```bash
npm run start:rest     # Porta 3000
```

### Executar GraphQL
```bash
npm run start:graphql  # Porta 4000
```

### Executar Ambos
```bash
npm run start:all
```

### Modo Desenvolvimento
```bash
npm run dev:rest
npm run dev:graphql
npm run dev:all
```

## Endpoints
- REST API: http://localhost:3000
- GraphQL API: http://localhost:4000/graphql
- Documentação Swagger: http://localhost:3000/api/docs/swagger
- Health REST: http://localhost:3000/health
- Health GraphQL: http://localhost:4000/health

## Collection Postman
Importe `swagger-collection.json` no Postman e:
- Faça login com o endpoint `Login`
- Copie o token gerado e utilize nos demais endpoints com `Bearer <token>`

## Usuário Administrador Padrão
```
Usuário: admin
Email: admin@admin.com
Senha: 123456
```

## Testes com cURL

### Registro
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"ash","email":"ash@email.com","password":"pikachu123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@admin.com","password":"123456"}'
```

### Criar Pokémon
```bash
curl -X POST http://localhost:3000/api/pokemon \
-H "Authorization: Bearer <seu-token>" \
-H "Content-Type: application/json" \
-d '{"name":"Bulbasaur","type":"Grama","number":1}'
```

## Exemplo de GraphQL

### Query
```graphql
query {
  pokemons {
    uuid
    name
    type
    number
  }

  users {
    uuid
    username
    email
  }
}
```

### Mutation
```graphql
mutation {
  login(email: "admin@admin.com", password: "123456") {
    token
    user {
      uuid
      username
    }
  }
}
```

## Notas
- Dados são armazenados em memória e perdidos ao reiniciar
- Autenticação obrigatória para rotas protegidas
- Swagger usa arquivo JSON (não .js)
- REST e GraphQL rodam em servidores separados

## K6 – Teste de Performance
## Conceitos aplicados
#### 1. Thresholds
Utilizados para definir limites de performance e garantir que as respostas da API estejam dentro dos tempos aceitáveis.

**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Utilização:**
```js
thresholds: {
    http_req_duration: ['p(90)<=2000', 'p(95)<=3000'],
    http_req_failed: ['rate<0.01']
},
```

#### 2. Checks
Utilizados para validar se a aplicação está executando corretamente.  
Como a API não retorna um campo específico de sucesso, foi criada uma verificação para validar se a palavra **"sucesso"** está presente na mensagem retornada.


**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Importação:**
```js
import { sleep, check, group } from 'k6';
```

**Utilização:**
```js
check(res, {
    'status do cadastro deve ser igual a 201': (res) => res.status === 201,
    'mensagem do cadastro deve ser de sucesso': (res) => res.json('mensagem')?.includes('sucesso')
});
```

#### 3. Helpers
Utilizados para separar as chamadas em arquivos reutilizáveis, facilitando manutenção e leitura.

**Localização:**
- [helpers](test/k6/helpers/)
- [login.js](test/k6/helpers/login.js)
- [register.js](test/k6/helpers/register.js)
- [baseURL.js](test/k6/helpers/baseURL.js)

**Importação:**
```js
import { BASE_URL } from './helpers/baseURL.js';
import { register } from './helpers/register.js';
import { login } from './helpers/login.js';
```

**Utilização:**

Função no arquivo principal:
```js
let res = register(username, email, password)
```

Função no helper de cadastro:
```js
export function register(username, email, password){
    let payload = {
        username,
        email,
        password
    };

    let res = http.post(
            `${BASE_URL}/api/auth/register`,
            JSON.stringify(payload),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    return res;
}
```

#### 4. Trends
Utilizado para a criação de métricas customizadas, permitindo a análise do tempo de resposta de operações específicas durante a execução do teste.

**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Importação:**
```js
import { Trend } from 'k6/metrics';
```

**Utilização:**

Declaração da métrica customizada:
```js
const postRegisterUserDurationTrend = new Trend ('post_register_user_duration');
```

Registro do tempo de duração da requisição:
```js
postRegisterUserDurationTrend.add(res.timings.duration);
```

#### 5. Faker
Utilizado para gerar dados dinâmicos.

**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Importação:**
```js
import faker from "k6/x/faker"
```

**Utilização:**
```js
username = faker.person.firstName();
email = faker.person.email();
password = faker.internet.password();
```

#### 6. Variáveis de Ambiente
Utilizada a variável de ambiente para permitir a reutilização do teste em diferentes ambientes, sem necessidade de alteração no código.

**Localização:**
[baseURL.js](test/k6/helpers/baseURL.js)

**Importação:**
```js
import { BASE_URL } from './helpers/baseURL.js';
```

**Utilização:**
```js
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
```

#### 7. Stages
Utilizada para simular diferentes níveis de carga de usuários virtuais.

**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Utilização:**
```js
stages: [
        { duration: '3s', target: 10 },
        { duration: '5s', target: 5 },
        { duration: '15s', target: 15 },
        { duration: '7s', target: 2 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 0 },
],
```

#### 8. Reaproveitamento de Resposta
Utilizado para capturar dados retornados por uma requisição e reutilizá-los em etapas posteriores do teste.

**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Utilização:**
Coleta do token após login:
```js
token = res.json('token');
```

Utilização do token nas requisições autenticadas:
```js
{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
```

#### 9. Uso de Token de Autenticação
Utilizado para autenticar o usuário e permitir o acesso a endpoints protegidos que exigem sessão válida.

**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Utilização:**
Coleta do token após login:
```js
token = res.json('token');
```

Utilização do token nas requisições autenticadas:
```js
{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
```

#### 10. Data-Driven Testing
Utilizado para executar os testes a partir de um conjunto de dados externos, permitindo a reutilização do mesmo fluxo de teste com diferentes entradas.

**Localização:**
- [registerPokemon.js](test/k6/registerPokemon.js)
- [pokemon.test.data.json](test/k6/data/pokemon.test.data.json)

**Importação do SharedArray:**
```js
import { SharedArray } from 'k6/data';
```

**Utilização:**
Declaração da variável utilizando `SharedArray`:
```js
const pokemons = new SharedArray('pokemons', function (){
    return JSON.parse(open('./data/pokemon.test.data.json'));
})
```
Seleção dos dados com base na iteração do teste:
```js
const pokemon = pokemons[ exec.scenario.iterationInTest % pokemons.length ];
```
Utilização dos dados na requisição:
```js
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
```

#### 11. Groups
Utilizado para agrupar ações relacionadas dentro do fluxo de teste, facilitando a organização, leitura dos resultados e análise por etapa.

**Importação:**
```js
import { sleep, check, group } from 'k6';
```
**Localização:**
[registerPokemon.js](test/k6/registerPokemon.js)

**Utilização:**
```js
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
```

## Relatório em HTML
**Localização:**
[html-report.html](test/k6/html-report.html)

## Licença
Projeto sob licença MIT.
