const { Schema, model } = require('mongoose');

const PlatoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        required: false // Opcional, solo si el plato es típico de una ciudad
    }
});

module.exports = model('Plato', PlatoSchema);