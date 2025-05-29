const { Router } = require('express');
const { 
    crearVisita, 
    obtenerVisitas, 
    obtenerVisita, 
    actualizarVisita, 
    eliminarVisita,
    obtenerVisitasPorCiudad,
    obtenerVisitasPorPais
} = require('../controllers/visita.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const Visita = require('../models/visita.model');
const Ciudad = require('../models/ciudades.model');
const Sitio = require('../models/sitios.model');
const Pais = require('../models/paises.model');
const Plato = require('../models/platos.model');
const Usuario = require('../models/mongoUsuario.model');

const router = Router();

router.post('/', validarJWT, crearVisita);
router.get('/', validarJWT, obtenerVisitas);
// Nuevas rutas:
router.get('/ciudad/:idCiudad', validarJWT, obtenerVisitasPorCiudad);
router.get('/pais/:idPais', validarJWT, obtenerVisitasPorPais);

router.get('/:id', validarJWT, obtenerVisita);
router.put('/:id', validarJWT, actualizarVisita);
router.delete('/:id', validarJWT, eliminarVisita);

// ...resto de rutas personalizadas...

module.exports = router;