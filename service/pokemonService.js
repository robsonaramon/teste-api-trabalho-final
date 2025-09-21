const uuid = require('uuid');
const uuidv4 = uuid.v4;   

const pokemons = require('../model/Pokemon');

function findPokemonByName(name) {
    return pokemons.find(p => p.name.toLowerCase() === name.toLowerCase());
}

function createPokemon({ name, type, number, owner }) {
    if (pokemons.some(p => p.owner === owner && p.name === name)) {
        throw new Error('Você já registrou este Pokémon.');
    }
    if (findPokemonByName(name)) {
        throw new Error('Nome do Pokémon já cadastrado.');
    }
    const pokemon = {
        uuid: uuidv4(), 
        name,
        type,
        number,
        owner
    };
    pokemons.push(pokemon);
    return pokemon;
}

function listPokemons(query = {}) {
    let result = pokemons;
    if (query.name) result = result.filter(p => p.name.toLowerCase().includes(query.name.toLowerCase()));
    if (query.type) result = result.filter(p => p.type.toLowerCase() === query.type.toLowerCase());
    if (query.number) result = result.filter(p => p.number == query.number);
    return result;
}

function updatePokemon(uuid, data, requester) {
    const pokemon = pokemons.find(p => p.uuid === uuid);
    if (!pokemon) throw new Error('Pokémon não encontrado.');
    if (pokemon.owner !== requester.uuid) throw new Error('Apenas o dono pode atualizar este Pokémon.');
    if (data.name && findPokemonByName(data.name) && data.name !== pokemon.name) {
        throw new Error('Nome do Pokémon já cadastrado.');
    }
    Object.assign(pokemon, data);
    return pokemon;
}

function deletePokemon(uuid, requester) {
    const idx = pokemons.findIndex(p => p.uuid === uuid);
    if (idx === -1) throw new Error('Pokémon não encontrado.');
    if (pokemons[idx].owner !== requester.uuid) throw new Error('Apenas o dono pode excluir este Pokémon.');
    pokemons.splice(idx, 1);
}

module.exports = { findPokemonByName, createPokemon, listPokemons, updatePokemon, deletePokemon };
