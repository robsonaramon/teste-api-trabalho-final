const { findUserByEmail, createUser, listUsers } = require('../service/userService');
const { comparePassword, generateToken } = require('../service/authService');
const { createPokemon, listPokemons, updatePokemon, deletePokemon } = require('../service/pokemonService');

module.exports = {
  Query: {
    users: () => listUsers(),
    pokemons: (_, args) => listPokemons(args)
  },
  Mutation: {
    register: (_, { username, email, password }) => {
      const user = createUser({ username, email, password });
      const token = generateToken(user);
      return { token, user };
    },
    login: (_, { email, password }) => {
      const user = findUserByEmail(email);
      if (!user || !comparePassword(password, user.password)) {
        throw new Error('Usuário ou senha inválidos.');
      }
      const token = generateToken(user);
      return { token, user };
    },
    createPokemon: (_, { name, type, number }, { user }) => {
      if (!user) throw new Error('Autenticação obrigatória.');
      return createPokemon({ name, type, number, owner: user.uuid });
    },
    updatePokemon: (_, { uuid, name, type, number }, { user }) => {
      if (!user) throw new Error('Autenticação obrigatória.');
      return updatePokemon(uuid, { name, type, number }, user);
    },
    deletePokemon: (_, { uuid }, { user }) => {
      if (!user) throw new Error('Autenticação obrigatória.');
      deletePokemon(uuid, user);
      return 'Pokémon excluído com sucesso.';
    }
  }
};
