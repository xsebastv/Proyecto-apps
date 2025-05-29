const { Router } = require('express');
const router = Router();

router.use('/auth', require('./auth.route'));

router.use('/ciudades', require('./ciudades.route'));
router.use('/famosos', require('./famosos.route'));
router.use('/menu_sitio', require('./menu_sitio.route'));
router.use('/paises', require('./paises.route'));
router.use('/personajes', require('./personajes.route'));
router.use('/platos', require('./platos.route'));
router.use('/sitios', require('./sitios.route'));
router.use('/tags', require('./tags.route'));
router.use('/visita', require('./visita.route'));

module.exports = router;