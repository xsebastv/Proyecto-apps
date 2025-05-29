const { Schema, model } = require('mongoose');

const CiudadSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    },
    imagen: {
        type: String 
    },
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    poblacion: {
        type: Number,
        required: true
    }
});

module.exports = model('Ciudad', CiudadSchema);