const { Router } = require('express');
const { agregarFavorito, quitarFavorito, obtenerFavoritos } = require('../controllers/favoritos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta para agregar un favorito
router.post('/agregar', validarJWT, agregarFavorito);

// Ruta para quitar un favorito
router.post('/quitar', validarJWT, quitarFavorito);

// Ruta para obtener los favoritos del usuario autenticado
router.get('/', validarJWT, obtenerFavoritos);

// Ruta para obtener los favoritos de un usuario específico por usuarioId
router.get('/favoritos/:usuarioId', validarJWT, obtenerFavoritos);

// Ruta redundante para obtener los favoritos del usuario autenticado (puede ser eliminada si no es necesaria)
router.get('/favoritos', validarJWT, obtenerFavoritos);

module.exports = router;