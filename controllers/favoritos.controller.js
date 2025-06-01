const Usuario = require('../models/mongoUsuario.model');

const agregarFavorito = async (req, res) => {
    try {
        const { sitioId } = req.body;
        if (!sitioId) return res.status(400).json({ error: 'Falta el sitioId' });

        const usuario = await Usuario.findByIdAndUpdate(
            req.usuario._id,
            { $addToSet: { favoritos: sitioId } },
            { new: true }
        ).populate('favoritos');

        res.json({ favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const quitarFavorito = async (req, res) => {
    try {
        const { sitioId } = req.body;
        if (!sitioId) return res.status(400).json({ error: 'Falta el sitioId' });

        const usuario = await Usuario.findByIdAndUpdate(
            req.usuario._id,
            { $pull: { favoritos: sitioId } },
            { new: true }
        ).populate('favoritos');

        res.json({ favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerFavoritos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario._id).populate('favoritos');
        res.json({ favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { agregarFavorito, quitarFavorito, obtenerFavoritos };