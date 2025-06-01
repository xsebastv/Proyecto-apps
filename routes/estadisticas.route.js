const { Router } = require('express');
const { getUsuariosConMasVisitas } = require('../controllers/estadisticas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/usuarios/top/visitas', validarJWT, getUsuariosConMasVisitas);

module.exports = router;