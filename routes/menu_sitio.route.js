const { Router } = require('express');
const { 
    crearMenuSitio, 
    obtenerMenuSitios, 
    obtenerMenuSitio, 
    actualizarMenuSitio, 
    eliminarMenuSitio 
} = require('../controllers/menu_sitio.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearMenuSitio);
router.get('/', validarJWT, obtenerMenuSitios);
router.get('/:id', validarJWT, obtenerMenuSitio);
router.put('/:id', validarJWT, actualizarMenuSitio);
router.delete('/:id', validarJWT, eliminarMenuSitio);

module.exports = router;