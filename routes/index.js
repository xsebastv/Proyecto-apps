const { Router } = require('express');
const router = Router();

// Rutas de autenticación
router.use('/auth', require('./auth.route'));

// Rutas relacionadas con ciudades
router.use('/ciudades', require('./ciudades.route'));

// Rutas relacionadas con famosos
router.use('/famosos', require('./famosos.route'));

// Rutas relacionadas con el menú de sitios
router.use('/menu_sitio', require('./menu_sitio.route'));

// Rutas relacionadas con países
router.use('/paises', require('./paises.route'));

// Rutas relacionadas con personajes
router.use('/personajes', require('./personajes.route'));

// Rutas relacionadas con platos
router.use('/platos', require('./platos.route'));

// Rutas relacionadas con sitios
router.use('/sitios', require('./sitios.route'));

// Rutas relacionadas con etiquetas de famosos
app.use('/api/famosotags', famosoTagRoutes);

// Rutas relacionadas con visitas
router.use('/visita', require('./visita.route'));

// Rutas relacionadas con favoritos
router.use('/favoritos', require('./favoritos.route'));

// Rutas relacionadas con estadísticas
router.use('/estadisticas', require('./estadisticas.route'));

module.exports = router;