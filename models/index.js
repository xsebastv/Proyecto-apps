const Ciudad = require('./ciudades.model');
const Famoso = require('./famosos.model');
const MenuSitio = require('./menu_sitio.model');
const Pais = require('./paises.model');
const Personaje = require('./personajes.model');
const Plato = require('./platos.model');
const Sitio = require('./sitios.model');
const FamosoTag = require('./famosoTag.model');
const Usuario = require('./mongoUsuario.model');
const Visita = require('./visita.model');

module.exports = {
    Usuario,
    Ciudad,
    Famoso,
    MenuSitio,
    Pais,
    Personaje,
    Plato,
    Sitio,
    FamosoTag,
    Visita
};