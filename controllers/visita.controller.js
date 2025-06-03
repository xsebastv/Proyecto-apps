const Visita = require('../models/visita.model');
const Ciudad = require('../models/ciudades.model');
const Sitio = require('../models/sitios.model');

// Crear una visita (usuario autenticado)
const crearVisita = async (req, res) => {
    try {
        const usuario = req.usuario.id; // Tomar del JWT
        const { sitio, fecha_visita, comentario } = req.body;
        const existe = await Visita.findOne({ usuario, sitio, fecha_visita });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe una visita registrada para ese usuario, sitio y fecha' });
        }
        const visita = new Visita({ usuario, sitio, fecha_visita, comentario });
        await visita.save();
        res.status(201).json(visita);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las visitas del usuario autenticado
const obtenerVisitas = async (req, res) => {
    try {
        const usuario = req.usuario.id;
        const visitas = await Visita.find({ usuario }).populate('usuario sitio');
        res.status(200).json(visitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una visita por ID (solo si pertenece al usuario)
const obtenerVisita = async (req, res) => {
    try {
        const usuario = req.usuario.id;
        const visita = await Visita.findOne({ _id: req.params.id, usuario }).populate('usuario sitio');
        if (!visita) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.status(200).json(visita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener visitas por ciudad (solo del usuario autenticado)
const obtenerVisitasPorCiudad = async (req, res) => {
    try {
        const usuario = req.usuario.id;
        const { idCiudad } = req.params;
        const sitios = await Sitio.find({ ciudad: idCiudad }).select('_id');
        const sitioIds = sitios.map(s => s._id);
        const visitas = await Visita.find({ usuario, sitio: { $in: sitioIds } }).populate('usuario sitio');
        res.status(200).json(visitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener visitas por país (solo del usuario autenticado)
const obtenerVisitasPorPais = async (req, res) => {
    try {
        const usuario = req.usuario.id;
        const { idPais } = req.params;
        const ciudades = await Ciudad.find({ pais: idPais }).select('_id');
        const ciudadIds = ciudades.map(c => c._id);
        const sitios = await Sitio.find({ ciudad: { $in: ciudadIds } }).select('_id');
        const sitioIds = sitios.map(s => s._id);
        const visitas = await Visita.find({ usuario, sitio: { $in: sitioIds } }).populate('usuario sitio');
        res.status(200).json(visitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las visitas (de todos los usuarios) para estadísticas
const obtenerTodasLasVisitas = async (req, res) => {
    try {
        const visitas = await Visita.find().populate('usuario sitio');
        res.status(200).json(visitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una visita por ID (solo si pertenece al usuario)
const actualizarVisita = async (req, res) => {
    try {
        const usuario = req.usuario.id;
        const { sitio, fecha_visita, comentario } = req.body;
        const { id } = req.params;
        if (sitio && fecha_visita) {
            const existe = await Visita.findOne({
                _id: { $ne: id },
                usuario,
                sitio,
                fecha_visita
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe una visita registrada para ese usuario, sitio y fecha' });
            }
        }
        const visita = await Visita.findOneAndUpdate(
            { _id: id, usuario },
            { sitio, fecha_visita, comentario },
            { new: true }
        );
        if (!visita) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.status(200).json(visita);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una visita por ID (solo si pertenece al usuario)
const eliminarVisita = async (req, res) => {
    try {
        const usuario = req.usuario.id;
        const visita = await Visita.findOneAndDelete({ _id: req.params.id, usuario });
        if (!visita) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.json({ message: 'Visita eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearVisita,
    obtenerVisitas,
    obtenerVisita,
    actualizarVisita,
    eliminarVisita,
    obtenerVisitasPorCiudad,
    obtenerVisitasPorPais,
    obtenerTodasLasVisitas // <-- ¡No olvides exportar este método!
};