const { Schema, model } = require('mongoose');

const SitioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Restaurante', 'Museo', 'Iglesia', 'Estadio', 'Hotel', 'Parque', 'Otro']
    },
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    imagen: {
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Sitio', SitioSchema);