const Plato = require('../models/platos.model');
const Ciudad = require('../models/ciudades.model');
const mongoose = require('mongoose');

// Crear un nuevo plato
const crearPlato = async (req, res) => {
    try {
        const { nombre } = req.body;
        // Validar duplicado (nombre, sin importar mayúsculas/minúsculas)
        const existe = await Plato.findOne({ nombre: { $regex: `^${nombre}$`, $options: 'i' } });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe un plato con ese nombre' });
        }
        const plato = new Plato(req.body);
        await plato.save();
        res.status(201).json(plato);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los platos
const obtenerPlatos = async (req, res) => {
    try {
        const platos = await Plato.find();
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un plato por ID
const obtenerPlato = async (req, res) => {
    try {
        const plato = await Plato.findById(req.params.id);
        if (!plato) {
            return res.status(404).json({ message: 'Plato no encontrado' });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener platos por ciudad
const obtenerPlatosPorCiudad = async (req, res) => {
    try {
        const { idCiudad } = req.params;
        const platos = await Plato.find({ ciudad: idCiudad });
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener platos por país
const obtenerPlatosPorPais = async (req, res) => {
    try {
        const { idPais } = req.params;
        const platos = await Plato.find({ pais: new mongoose.Types.ObjectId(idPais) });
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un plato por ID
const actualizarPlato = async (req, res) => {
    try {
        const { nombre } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia el nombre
        if (nombre) {
            const existe = await Plato.findOne({ 
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' }
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe un plato con ese nombre' });
            }
        }
        const plato = await Plato.findByIdAndUpdate(id, req.body, { new: true });
        if (!plato) {
            return res.status(404).json({ message: 'Plato no encontrado' });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un plato por ID
const eliminarPlato = async (req, res) => {
    try {
        const plato = await Plato.findByIdAndDelete(req.params.id);
        if (!plato) {
            return res.status(404).json({ message: 'Plato no encontrado' });
        }
        res.json({ message: 'Plato eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearPlato,
    obtenerPlatos,
    obtenerPlato,
    actualizarPlato,
    eliminarPlato,
    obtenerPlatosPorCiudad,
    obtenerPlatosPorPais
};