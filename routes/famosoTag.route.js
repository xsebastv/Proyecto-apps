const { Router } = require('express');
const { crearFamosoTag, obtenerTagsPorFamoso, obtenerTagsPorUsuario, obtenerTodosLosTags } = require('../controllers/famosoTag.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearFamosoTag);
router.get('/famoso/:idFamoso', validarJWT, obtenerTagsPorFamoso);
router.get('/usuario', validarJWT, obtenerTagsPorUsuario);
router.get('/', obtenerTodosLosTags); // <-- Nueva ruta para obtener todos los tags

module.exports = router;