const pokemonService = require('../service/pokemonService');

exports.create = (req, res) => {
    const { name, type, number } = req.body;
    try {
        const pokemon = pokemonService.createPokemon({ name, type, number, owner: req.user.uuid });
        res.status(201).json({ mensagem: 'Pokémon cadastrado com sucesso.', pokemon });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.list = (req, res) => {
    const { name, type, number } = req.query;
    try {
        const pokemons = pokemonService.listPokemons({ name, type, number });
        res.json({ pokemons });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.update = (req, res) => {
    const { uuid } = req.params;
    try {
        const pokemon = pokemonService.updatePokemon(uuid, req.body, req.user);
        res.json({ mensagem: 'Pokémon atualizado com sucesso.', pokemon });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.delete = (req, res) => {
    const { uuid } = req.params;
    try {
        pokemonService.deletePokemon(uuid, req.user);
        res.json({ mensagem: 'Pokémon excluído com sucesso.' });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};
