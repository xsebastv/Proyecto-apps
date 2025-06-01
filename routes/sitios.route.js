const { Router } = require('express');
const {
    crearSitio,
    obtenerSitios,
    obtenerSitio,
    actualizarSitio,
    eliminarSitio,
    obtenerSitiosPorCiudad,
    obtenerSitiosPorPais,
    obtenerTopSitiosPorPais
} = require('../controllers/sitios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// Solo admin puede crear, actualizar o eliminar sitios
router.post('/', validarJWT, esAdminRole, crearSitio);
router.put('/:id', validarJWT, esAdminRole, actualizarSitio);
router.delete('/:id', validarJWT, esAdminRole, eliminarSitio);

// Consultas públicas
router.get('/', obtenerSitios);
router.get('/:id', obtenerSitio);
router.get('/ciudad/:idCiudad', obtenerSitiosPorCiudad);
router.get('/pais/:idPais', obtenerSitiosPorPais);
router.get('/top/pais/:idPais', obtenerTopSitiosPorPais);

module.exports = router;