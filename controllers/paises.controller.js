const Pais = require('../models/paises.model');

// Crear un país
const crearPais = async (req, res) => {
    try {
        const { nombre } = req.body;
        // Validar duplicado (nombre, sin importar mayúsculas/minúsculas)
        const existe = await Pais.findOne({ nombre: { $regex: `^${nombre}$`, $options: 'i' } });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe un país con ese nombre' });
        }
        const pais = new Pais(req.body);
        await pais.save();
        res.status(201).json(pais);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el país', error: error.message });
    }
};

// Obtener todos los países
const obtenerPaises = async (req, res) => {
    try {
        const paises = await Pais.find();
        res.status(200).json(paises);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los países', error: error.message });
    }
};

// Obtener un país por ID
const obtenerPais = async (req, res) => {
    try {
        const pais = await Pais.findById(req.params.id);
        if (!pais) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json(pais);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el país', error: error.message });
    }
};

// Actualizar un país por ID
const actualizarPais = async (req, res) => {
    try {
        const { nombre } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia el nombre
        if (nombre) {
            const existe = await Pais.findOne({ 
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' }
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe un país con ese nombre' });
            }
        }
        const pais = await Pais.findByIdAndUpdate(id, req.body, { new: true });
        if (!pais) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json(pais);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el país', error: error.message });
    }
};

// Eliminar un país por ID
const eliminarPais = async (req, res) => {
    try {
        const pais = await Pais.findByIdAndDelete(req.params.id);
        if (!pais) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.json({ message: 'País eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el país', error: error.message });
    }
};

module.exports = {
    crearPais,
    obtenerPaises,
    obtenerPais,
    actualizarPais,
    eliminarPais
};