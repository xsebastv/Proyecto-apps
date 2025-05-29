const { Router } = require('express');
const { 
    crearPais, 
    obtenerPaises, 
    obtenerPais, 
    actualizarPais, 
    eliminarPais 
} = require('../controllers/paises.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearPais);
router.get('/', validarJWT, obtenerPaises);
router.get('/:id', validarJWT, obtenerPais);
router.put('/:id', validarJWT, actualizarPais);
router.delete('/:id', validarJWT, eliminarPais);

module.exports = router;