const { Router } = require('express');
const { register, login, getFavoritos, addFavorito, removeFavorito } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Favoritos
router.get('/favoritos', validarJWT, getFavoritos);
router.post('/favoritos', validarJWT, addFavorito);
router.delete('/favoritos', validarJWT, removeFavorito);

module.exports = router;