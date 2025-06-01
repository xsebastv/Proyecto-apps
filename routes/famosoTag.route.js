const { Router } = require('express');
const { crearFamosoTag, obtenerTagsPorFamoso, obtenerTagsPorUsuario } = require('../controllers/famosoTag.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearFamosoTag);
router.get('/famoso/:idFamoso', validarJWT, obtenerTagsPorFamoso);
router.get('/usuario', validarJWT, obtenerTagsPorUsuario);

module.exports = router;