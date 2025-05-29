const { Router } = require('express');
const { 
    crearTag,
    obtenerTags,
    obtenerTag,
    actualizarTag,
    eliminarTag,
    obtenerTagsPorCiudad,
    obtenerTagsPorPais
} = require('../controllers/tags.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearTag);
router.get('/', validarJWT, obtenerTags);
// Nuevas rutas:
router.get('/ciudad/:idCiudad', validarJWT, obtenerTagsPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerTagsPorPais);

router.get('/:id', validarJWT, obtenerTag);
router.put('/:id', validarJWT, actualizarTag);
router.delete('/:id', validarJWT, eliminarTag);

module.exports = router;