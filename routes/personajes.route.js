const { Router } = require('express');
const { 
    crearPersonaje, 
    obtenerPersonajes, 
    obtenerPersonaje, 
    actualizarPersonaje, 
    eliminarPersonaje,
    obtenerPersonajesPorCiudad,
    obtenerPersonajesPorPais
} = require('../controllers/personajes.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearPersonaje);
router.get('/', validarJWT, obtenerPersonajes);
// Nuevas rutas:
router.get('/ciudad/:idCiudad', validarJWT, obtenerPersonajesPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerPersonajesPorPais);

router.get('/:id', validarJWT, obtenerPersonaje);
router.put('/:id', validarJWT, actualizarPersonaje);
router.delete('/:id', validarJWT, eliminarPersonaje);

module.exports = router;