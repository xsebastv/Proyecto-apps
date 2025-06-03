const FamosoTag = require('../models/famosoTag.model');

// Crear un tag
const crearFamosoTag = async (req, res) => {
    try {
        const tag = new FamosoTag({ ...req.body, usuario: req.usuario._id });
        await tag.save();
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los tags de un famoso
const obtenerTagsPorFamoso = async (req, res) => {
    try {
        const { idFamoso } = req.params;
        const tags = await FamosoTag.find({ famoso: idFamoso })
            .populate('usuario', 'nombre');
        res.json({ tags });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener tags', error });
    }
};

// Obtener todos los tags de un usuario
const obtenerTagsPorUsuario = async (req, res) => {
    try {
        const tags = await FamosoTag.find({ usuario: req.usuario._id })
            .populate('famoso', 'nombre');
        res.json({ tags }); // <-- Cambiado para devolver un objeto con la propiedad tagsasdada
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearFamosoTag,
    obtenerTagsPorFamoso,
    obtenerTagsPorUsuario
};