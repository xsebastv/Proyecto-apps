const { Visita, Usuario } = require('../models');

const getUsuariosConMasVisitas = async (req, res) => {
    try {
        const usuarios = await Visita.aggregate([
            {
                $group: {
                    _id: '$usuario',
                    visitas: { $sum: 1 }
                }
            },
            { $sort: { visitas: -1 } },
            { $limit: 10 }
        ]);
        // Populate usuario info
        const usuariosPopulados = await Usuario.find({
            _id: { $in: usuarios.map(u => u._id) }
        });
        res.json(usuarios.map(u => ({
            usuario: usuariosPopulados.find(up => up._id.equals(u._id)),
            visitas: u.visitas
        })));
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios con más visitas', error: error.message });
    }
};

module.exports = {
    getUsuariosConMasVisitas
};