const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    uuid: ID!
    username: String!
    email: String!
    isAdmin: Boolean
  }

  type Pokemon {
    uuid: ID!
    name: String!
    type: String!
    number: Int!
    owner: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    pokemons(name: String, type: String, number: Int): [Pokemon!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createPokemon(name: String!, type: String!, number: Int!): Pokemon!
    updatePokemon(uuid: ID!, name: String, type: String, number: Int): Pokemon!
    deletePokemon(uuid: ID!): String!
  }
`;
