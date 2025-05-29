const { Router } = require('express');
const { 
    crearCiudad, 
    obtenerCiudades, 
    obtenerCiudad, 
    actualizarCiudad, 
    eliminarCiudad,
    obtenerCiudadesPorPais
} = require('../controllers/ciudades.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearCiudad);
router.get('/', validarJWT, obtenerCiudades);
// Nueva ruta para obtener ciudades por país
router.get('/pais/:id', validarJWT, obtenerCiudadesPorPais);
router.get('/:id', validarJWT, obtenerCiudad);
router.put('/:id', validarJWT, actualizarCiudad);
router.delete('/:id', validarJWT, eliminarCiudad);

module.exports = router;