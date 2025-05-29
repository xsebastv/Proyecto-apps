const { Schema, model } = require('mongoose');

const PersonajeSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    edad: {
        type: Number
    },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        required: true
    },
    imagen: {
        type: String
    }
});

module.exports = model('Personaje', PersonajeSchema);