import Player from '../models/player.model.js';

export const playerController = {
    createPlayer: async (req, res) => {
        try {
            const newPlayer = await Player.create(req.body);
            res.status(201).json(newPlayer);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    getAllPlayers: async (req, res) => {
        try {
            const allPlayers = await Player.find();
            res.status(200).json(allPlayers);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    getOnePlayer: async (req, res) => {
        try {
            const foundPlayer = await Player.findById(req.params.id);
            res.status(200).json(foundPlayer);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    updateOnePlayer: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        };
        try {
            const options = {
                new:true,
                runValidators: true
            }
            const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, options);
            res.status(201).json(updatedPlayer);
        }
        catch (error) {
            return res.status(500).json(error)
        }
    },

    deleteOnePlayer: async (req, res) => {
        try {
            const deletePlayer = await Player.findByIdAndDelete(req.params.id);
            console.log(deletePlayer)
            return res.status(204).send()
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }
}