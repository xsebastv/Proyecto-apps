const Tag = require('../models/tags.model');
const Ciudad = require('../models/ciudades.model');

// Crear un tag
const crearTag = async (req, res) => {
    try {
        const { nombre } = req.body;
        // Validar duplicado (nombre, sin importar mayúsculas/minúsculas)
        const existe = await Tag.findOne({ nombre: { $regex: `^${nombre}$`, $options: 'i' } });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe un tag con ese nombre' });
        }
        const tag = new Tag(req.body);
        await tag.save();
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los tags
const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un tag por ID
const obtenerTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag no encontrado' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener tags por ciudad
const obtenerTagsPorCiudad = async (req, res) => {
    try {
        const { idCiudad } = req.params;
        const tags = await Tag.find({ ciudad: idCiudad });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener tags por país
const obtenerTagsPorPais = async (req, res) => {
    try {
        const { idPais } = req.params;
        // Busca todas las ciudades del país
        const ciudades = await Ciudad.find({ pais: idPais }).select('_id');
        const ciudadesIds = ciudades.map(c => c._id);
        // Busca tags cuya ciudad esté en esas ciudades
        const tags = await Tag.find({ ciudad: { $in: ciudadesIds } });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un tag por ID
const actualizarTag = async (req, res) => {
    try {
        const { nombre } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia el nombre
        if (nombre) {
            const existe = await Tag.findOne({
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' }
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe un tag con ese nombre' });
            }
        }
        const tag = await Tag.findByIdAndUpdate(id, req.body, { new: true });
        if (!tag) {
            return res.status(404).json({ message: 'Tag no encontrado' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un tag por ID
const eliminarTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag no encontrado' });
        }
        res.json({ message: 'Tag eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearTag,
    obtenerTags,
    obtenerTag,
    actualizarTag,
    eliminarTag,
    obtenerTagsPorCiudad,
    obtenerTagsPorPais
};