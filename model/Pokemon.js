const { v4: uuidv4 } = require('uuid');

const pokemons = [
	{ uuid: "d09a9171-3b5e-4c2c-a1a3-4000336741c2", name: 'Bulbasaur', type: 'Grama', number: 1, owner: "31081482-53b7-4fe6-bea3-7409cec27249" },
	{ uuid: uuidv4(), name: 'Ivysaur', type: 'Grama', number: 2 },
	{ uuid: uuidv4(), name: 'Venusaur', type: 'Grama', number: 3 },
	{ uuid: uuidv4(), name: 'Charmander', type: 'Fogo', number: 4 },
	{ uuid: uuidv4(), name: 'Charmeleon', type: 'Fogo', number: 5 },
	{ uuid: uuidv4(), name: 'Charizard', type: 'Fogo', number: 6 },
	{ uuid: uuidv4(), name: 'Squirtle', type: 'Água', number: 7 },
	{ uuid: uuidv4(), name: 'Wartortle', type: 'Água', number: 8 },
	{ uuid: uuidv4(), name: 'Blastoise', type: 'Água', number: 9 },
	{ uuid: uuidv4(), name: 'Caterpie', type: 'Inseto', number: 10 },
	{ uuid: uuidv4(), name: 'Metapod', type: 'Inseto', number: 11 },
	{ uuid: uuidv4(), name: 'Butterfree', type: 'Inseto', number: 12 },
	{ uuid: uuidv4(), name: 'Weedle', type: 'Inseto', number: 13 },
	{ uuid: uuidv4(), name: 'Kakuna', type: 'Inseto', number: 14 },
	{ uuid: uuidv4(), name: 'Beedrill', type: 'Inseto', number: 15 },
	{ uuid: uuidv4(), name: 'Pidgey', type: 'Normal', number: 16 },
	{ uuid: uuidv4(), name: 'Pidgeotto', type: 'Normal', number: 17 },
	{ uuid: uuidv4(), name: 'Pidgeot', type: 'Normal', number: 18 },
	{ uuid: uuidv4(), name: 'Rattata', type: 'Normal', number: 19 },
	{ uuid: uuidv4(), name: 'Raticate', type: 'Normal', number: 20 },
	{ uuid: uuidv4(), name: 'Spearow', type: 'Normal', number: 21 },
	{ uuid: uuidv4(), name: 'Fearow', type: 'Normal', number: 22 },
	{ uuid: uuidv4(), name: 'Ekans', type: 'Veneno', number: 23 },
	{ uuid: uuidv4(), name: 'Arbok', type: 'Veneno', number: 24 }
];

module.exports = pokemons;
