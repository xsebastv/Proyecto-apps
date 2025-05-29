const MenuSitio = require('../models/menu_sitio.model');

// Crear un nuevo menú de sitio
const crearMenuSitio = async (req, res) => {
    try {
        const { sitio, plato } = req.body;
        // Validar duplicado (sitio y plato)
        const existe = await MenuSitio.findOne({ sitio, plato });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe ese plato en el menú de ese sitio' });
        }
        const menuSitio = new MenuSitio(req.body);
        await menuSitio.save();
        res.status(201).json(menuSitio);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el menú de sitio', error: error.message });
    }
};

// Obtener todos los menús de sitio
const obtenerMenuSitios = async (req, res) => {
    try {
        const menuSitios = await MenuSitio.find()
            .populate('sitio', 'nombre ciudad')
            .populate('plato', 'nombre descripcion');
        res.status(200).json(menuSitios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los menús de sitio', error: error.message });
    }
};

// Obtener un menú de sitio por ID
const obtenerMenuSitio = async (req, res) => {
    try {
        const menuSitio = await MenuSitio.findById(req.params.id)
            .populate('sitio', 'nombre ciudad')
            .populate('plato', 'nombre descripcion');
        if (!menuSitio) {
            return res.status(404).json({ message: 'Menú de sitio no encontrado' });
        }
        res.status(200).json(menuSitio);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el menú de sitio', error: error.message });
    }
};

// Actualizar un menú de sitio por ID
const actualizarMenuSitio = async (req, res) => {
    try {
        const { sitio, plato } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia sitio o plato
        if (sitio && plato) {
            const existe = await MenuSitio.findOne({
                _id: { $ne: id },
                sitio,
                plato
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe ese plato en el menú de ese sitio' });
            }
        }
        const menuSitio = await MenuSitio.findByIdAndUpdate(id, req.body, { new: true });
        if (!menuSitio) {
            return res.status(404).json({ message: 'Menú de sitio no encontrado' });
        }
        res.status(200).json(menuSitio);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el menú de sitio', error: error.message });
    }
};

// Eliminar un menú de sitio por ID
const eliminarMenuSitio = async (req, res) => {
    try {
        const menuSitio = await MenuSitio.findByIdAndDelete(req.params.id);
        if (!menuSitio) {
            return res.status(404).json({ message: 'Menú de sitio no encontrado' });
        }
        res.json({ message: 'Menú de sitio eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el menú de sitio', error: error.message });
    }
};

module.exports = {
    crearMenuSitio,
    obtenerMenuSitios,
    obtenerMenuSitio,
    actualizarMenuSitio,
    eliminarMenuSitio
};