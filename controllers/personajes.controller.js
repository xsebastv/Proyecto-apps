const Personaje = require('../models/personajes.model');
const Ciudad = require('../models/ciudades.model');

// Crear un personaje
const crearPersonaje = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        // Validar duplicado (nombre y ciudad, sin importar mayúsculas/minúsculas)
        const existe = await Personaje.findOne({
            nombre: { $regex: `^${nombre}$`, $options: 'i' },
            ciudad
        });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe un personaje con ese nombre en esa ciudad' });
        }
        const personaje = new Personaje(req.body);
        await personaje.save();
        res.status(201).json(personaje);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los personajes
const obtenerPersonajes = async (req, res) => {
    try {
        const personajes = await Personaje.find().populate({
            path: 'ciudad',
            populate: { path: 'pais', select: 'nombre codigo continente' }
        });
        res.status(200).json(personajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un personaje por ID
const obtenerPersonaje = async (req, res) => {
    try {
        const personaje = await Personaje.findById(req.params.id).populate({
            path: 'ciudad',
            populate: { path: 'pais', select: 'nombre codigo continente' }
        });
        if (!personaje) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.status(200).json(personaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener personajes por ciudad
const obtenerPersonajesPorCiudad = async (req, res) => {
    try {
        const { idCiudad } = req.params;
        const personajes = await Personaje.find({ ciudad: idCiudad }).populate({
            path: 'ciudad',
            populate: { path: 'pais', select: 'nombre codigo continente' }
        });
        res.status(200).json(personajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener personajes por país
const obtenerPersonajesPorPais = async (req, res) => {
    try {
        const { idPais } = req.params;
        // Busca todas las ciudades del país
        const ciudades = await Ciudad.find({ pais: idPais }).select('_id');
        const ciudadesIds = ciudades.map(c => c._id);
        // Busca personajes cuya ciudad esté en esas ciudades
        const personajes = await Personaje.find({ ciudad: { $in: ciudadesIds } }).populate({
            path: 'ciudad',
            populate: { path: 'pais', select: 'nombre codigo continente' }
        });
        res.status(200).json(personajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un personaje por ID
const actualizarPersonaje = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia el nombre o ciudad
        if (nombre && ciudad) {
            const existe = await Personaje.findOne({
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' },
                ciudad
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe un personaje con ese nombre en esa ciudad' });
            }
        }
        const personaje = await Personaje.findByIdAndUpdate(id, req.body, { new: true });
        if (!personaje) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.status(200).json(personaje);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un personaje por ID
const eliminarPersonaje = async (req, res) => {
    try {
        const personaje = await Personaje.findByIdAndDelete(req.params.id);
        if (!personaje) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.json({ message: 'Personaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearPersonaje,
    obtenerPersonajes,
    obtenerPersonaje,
    actualizarPersonaje,
    eliminarPersonaje,
    obtenerPersonajesPorCiudad,
    obtenerPersonajesPorPais
};