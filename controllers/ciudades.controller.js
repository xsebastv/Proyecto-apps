const Ciudad = require('../models/ciudades.model');

// Obtener todas las ciudades (con país)
const obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudad.find().populate('pais', 'nombre codigo continente');
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ciudades', error: error.message });
    }
};

// Obtener ciudades por país
const obtenerCiudadesPorPais = async (req, res) => {
    const { id } = req.params; // id del país
    try {
        const ciudades = await Ciudad.find({ pais: id }).populate('pais', 'nombre codigo continente');
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ciudades del país', error: error.message });
    }
};

// Obtener una ciudad por ID (con país)
const obtenerCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const ciudad = await Ciudad.findById(id).populate('pais', 'nombre codigo continente');
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la ciudad', error: error.message });
    }
};

// Crear una nueva ciudad
const crearCiudad = async (req, res) => {
    try {
        const { nombre, pais } = req.body;
        // Validar duplicado (nombre y país, sin importar mayúsculas/minúsculas)
        const existe = await Ciudad.findOne({ 
            nombre: { $regex: `^${nombre}$`, $options: 'i' }, 
            pais 
        });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe una ciudad con ese nombre en ese país' });
        }
        const ciudad = new Ciudad(req.body);
        await ciudad.save();
        res.status(201).json(ciudad);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la ciudad', error: error.message });
    }
};

// Actualizar una ciudad
const actualizarCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const { nombre, pais } = req.body;
        // Validar duplicado si se cambia el nombre o país
        if (nombre && pais) {
            const existe = await Ciudad.findOne({ 
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' }, 
                pais 
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe una ciudad con ese nombre en ese país' });
            }
        }
        const ciudad = await Ciudad.findByIdAndUpdate(id, req.body, { new: true });
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.json(ciudad);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la ciudad', error: error.message });
    }
};

// Eliminar una ciudad
const eliminarCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const ciudad = await Ciudad.findByIdAndDelete(id);
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.json({ message: 'Ciudad eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la ciudad', error: error.message });
    }
};

module.exports = {
    obtenerCiudades,
    obtenerCiudadesPorPais,
    obtenerCiudad,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad
};