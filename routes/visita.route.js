const { Router } = require('express');
const { 
    crearVisita, 
    obtenerVisitas, 
    obtenerVisita, 
    actualizarVisita, 
    eliminarVisita,
    obtenerVisitasPorCiudad,
    obtenerVisitasPorPais,
    obtenerTodasLasVisitas // <-- Importa el nuevo método
} = require('../controllers/visita.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.post('/', validarJWT, crearVisita);
router.get('/', validarJWT, obtenerVisitas);

// Ruta para obtener todas las visitas (estadísticas)
router.get('/todas', validarJWT, obtenerTodasLasVisitas);

router.get('/ciudad/:idCiudad', validarJWT, obtenerVisitasPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerVisitasPorPais);

router.get('/:id', validarJWT, obtenerVisita);
router.put('/:id', validarJWT, actualizarVisita);
router.delete('/:id', validarJWT, eliminarVisita);

module.exports = router;