const { Router } = require('express');
const { 
    crearFamoso, 
    obtenerFamosos, 
    obtenerFamoso, 
    actualizarFamoso, 
    eliminarFamoso,
    obtenerFamososPorCiudad,
    obtenerFamososPorPais,
    obtenerFamososPorCategoria // Asegúrate de exportar esta función en tu controlador
} = require('../controllers/famosos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearFamoso);
router.get('/', validarJWT, obtenerFamosos);

// Nuevas rutas:
router.get('/ciudad/:idCiudad', validarJWT, obtenerFamososPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerFamososPorPais);

// Consulta especial: famosos por categoría y procedencia
router.get('/consulta/categoria', validarJWT, obtenerFamososPorCategoria);

router.get('/:id', validarJWT, obtenerFamoso);
router.put('/:id', validarJWT, actualizarFamoso);
router.delete('/:id', validarJWT, eliminarFamoso);

module.exports = router;