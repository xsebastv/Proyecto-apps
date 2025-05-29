const { Router } = require('express');
const { 
    crearSitio, 
    obtenerSitios, 
    obtenerSitio, 
    actualizarSitio, 
    eliminarSitio,
    obtenerSitiosPorCiudad,
    obtenerSitiosPorPais
} = require('../controllers/sitios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.post('/', [validarJWT, esAdminRole], crearSitio);
router.get('/', validarJWT, obtenerSitios);
// Nuevas rutas:
router.get('/ciudad/:idCiudad', validarJWT, obtenerSitiosPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerSitiosPorPais);

router.get('/:id', validarJWT, obtenerSitio);
router.put('/:id', validarJWT, actualizarSitio);
router.delete('/:id', validarJWT, eliminarSitio);

module.exports = router;