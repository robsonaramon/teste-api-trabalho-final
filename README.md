# Pokédex API - Projeto Final PGATS

API completa em JavaScript com Express que oferece endpoints REST e GraphQL para gerenciamento de usuários e Pokémon.

## 🚀 Funcionalidades
- Autenticação com JWT
- Registro com e-mail único
- Cadastro, listagem, atualização e remoção de Pokémon
- Busca por nome, tipo ou número
- Documentação Swagger (REST) e GraphQL Playground

## 🛠️ Tecnologias Utilizadas
- Node.js
- Express
- Apollo Server
- JWT
- bcryptjs
- Swagger UI (JSON)
- UUID

## 📋 Pré-requisitos
- Node.js v14+
- npm ou yarn

## 🔧 Instalação e Execução

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

## 🔗 Endpoints
- REST API: http://localhost:3000
- GraphQL API: http://localhost:4000/graphql
- Documentação Swagger: http://localhost:3000/api/docs/swagger
- Health REST: http://localhost:3000/health
- Health GraphQL: http://localhost:4000/health

## 📄 Collection Postman
Importe `swagger-collection.json` no Postman e:
- Faça login com o endpoint `Login`
- Copie o token gerado e utilize nos demais endpoints com `Bearer <token>`

## 🔐 Usuário Administrador Padrão
```
Usuário: admin
Email: admin@admin.com
Senha: 123456
```

## 🧪 Testes com cURL

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

## 📊 Exemplo de GraphQL

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

## 📌 Notas
- Dados são armazenados em memória e perdidos ao reiniciar
- Autenticação obrigatória para rotas protegidas
- Swagger usa arquivo JSON (não .js)
- REST e GraphQL rodam em servidores separados

## 📄 Licença
Projeto sob licença MIT.
