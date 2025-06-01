const { Router } = require('express');
const { agregarFavorito, quitarFavorito, obtenerFavoritos } = require('../controllers/favoritos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/agregar', validarJWT, agregarFavorito);
router.post('/quitar', validarJWT, quitarFavorito);
router.get('/', validarJWT, obtenerFavoritos);

module.exports = router;