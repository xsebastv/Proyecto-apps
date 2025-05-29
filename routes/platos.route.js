const { Router } = require('express');
const { 
    crearPlato,
    obtenerPlatos,
    obtenerPlato,
    actualizarPlato,
    eliminarPlato,
    obtenerPlatosPorCiudad,
    obtenerPlatosPorPais
} = require('../controllers/platos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearPlato);
router.get('/', validarJWT, obtenerPlatos);
// Nuevas rutas:
router.get('/ciudad/:idCiudad', validarJWT, obtenerPlatosPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerPlatosPorPais);

router.get('/:id', validarJWT, obtenerPlato);
router.put('/:id', validarJWT, actualizarPlato);
router.delete('/:id', validarJWT, eliminarPlato);

module.exports = router;