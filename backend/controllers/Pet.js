const Pet = require('../models/Pet');

// Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get pet by name
exports.getPetByName = async (req, res) => {
    try {
        const pet = await Pet.findOne({ name: req.params.name });
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new pet
exports.addPet = async (req, res) => {
    const newPet = new Pet(req.body);
    try {
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
