const Usuario = require('../models/mongoUsuario.model');

const agregarFavorito = async (req, res) => {
  try {
    console.log('Usuario:', req.usuario._id);
    console.log('SitioId:', req.body.sitioId);

    const { sitioId } = req.body;
    if (!sitioId) return res.status(400).json({ error: 'Falta el sitioId' });

    const usuario = await Usuario.findByIdAndUpdate(
      req.usuario._id,
      { $addToSet: { favoritos: sitioId } },
      { new: true }
    ).populate('favoritos');

    res.json({ favoritos: usuario.favoritos });
  } catch (error) {
    console.error('Error en agregarFavorito:', error);
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
        const usuarioId = req.params.usuarioId || req.usuario._id; // Usa usuarioId de params o el usuario autenticado
        const usuario = await Usuario.findById(usuarioId).populate('favoritos');
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const obtenerTodosLosFavoritos = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}).populate('favoritos', 'nombre');
        // Junta todos los favoritos en un solo array
        const todosFavoritos = usuarios.flatMap(usuario => usuario.favoritos);
        res.json({ favoritos: todosFavoritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { agregarFavorito, quitarFavorito, obtenerFavoritos, obtenerTodosLosFavoritos };