const Sitio = require('../models/sitios.model');
const Ciudad = require('../models/ciudades.model');
const Visita = require('../models/visita.model');
const mongoose = require('mongoose');

// Crear un sitio
const crearSitio = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        // Validar duplicado (nombre y ciudad, sin importar mayúsculas/minúsculas)
        const existe = await Sitio.findOne({
            nombre: { $regex: `^${nombre}$`, $options: 'i' },
            ciudad
        });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe un sitio con ese nombre en esa ciudad' });
        }
        const sitio = new Sitio(req.body);
        await sitio.save();
        res.status(201).json(sitio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los sitios
const obtenerSitios = async (req, res) => {
    try {
        const sitios = await Sitio.find();
        res.status(200).json(sitios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un sitio por ID
const obtenerSitio = async (req, res) => {
    try {
        const sitio = await Sitio.findById(req.params.id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio no encontrado' });
        }
        res.status(200).json(sitio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener sitios por ciudad
const obtenerSitiosPorCiudad = async (req, res) => {
    try {
        const { idCiudad } = req.params;
        const sitios = await Sitio.find({ ciudad: idCiudad });
        res.status(200).json(sitios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener sitios por país
const obtenerSitiosPorPais = async (req, res) => {
    try {
        const { idPais } = req.params;
        // Busca todas las ciudades del país
        const ciudades = await Ciudad.find({ pais: idPais }).select('_id');
        const ciudadesIds = ciudades.map(c => c._id.toString());
        // Busca sitios cuya ciudad esté en esas ciudades
        const sitios = await Sitio.find({ ciudad: { $in: ciudadesIds } });
        res.status(200).json(sitios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un sitio por ID
const actualizarSitio = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia el nombre o ciudad
        if (nombre && ciudad) {
            const existe = await Sitio.findOne({
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' },
                ciudad
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe un sitio con ese nombre en esa ciudad' });
            }
        }
        const sitio = await Sitio.findByIdAndUpdate(id, req.body, { new: true });
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio no encontrado' });
        }
        res.status(200).json(sitio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un sitio por ID
const eliminarSitio = async (req, res) => {
    try {
        const sitio = await Sitio.findByIdAndDelete(req.params.id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio no encontrado' });
        }
        res.json({ message: 'Sitio eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Consulta especial: Top 10 sitios más visitados por país
const obtenerTopSitiosPorPais = async (req, res) => {
    try {
        const { idPais } = req.params;
        // Buscar todas las ciudades del país
        const ciudades = await Ciudad.find({ pais: idPais }).select('_id');
        const ciudadesIds = ciudades.map(c => c._id);

        // Buscar todos los sitios de esas ciudades
        const sitios = await Sitio.find({ ciudad: { $in: ciudadesIds } }).select('_id nombre tipo ciudad');
        const sitioIds = sitios.map(s => s._id);

        // Agrupar visitas por sitio y contar
        const topSitios = await Visita.aggregate([
            { $match: { sitio: { $in: sitioIds } } },
            { $group: { _id: '$sitio', visitas: { $sum: 1 } } },
            { $sort: { visitas: -1 } },
            { $limit: 10 }
        ]);

        // Obtener información de los sitios
        const sitiosInfo = await Sitio.find({ _id: { $in: topSitios.map(s => s._id) } })
            .populate('ciudad');

        // Unir visitas con info de sitio
        const resultado = topSitios.map(ts => {
            const sitio = sitiosInfo.find(s => s._id.equals(ts._id));
            return {
                sitio,
                visitas: ts.visitas
            };
        });

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearSitio,
    obtenerSitios,
    obtenerSitio,
    actualizarSitio,
    eliminarSitio,
    obtenerSitiosPorCiudad,
    obtenerSitiosPorPais,
    obtenerTopSitiosPorPais
};