const { Schema, model } = require('mongoose');

const PaisSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    continente: {
        type: String,
        required: true
    },
    imagen: {
        type: String // URL o nombre de archivo de la imagen
    },
    poblacion: {
        type: Number,
        required: true
    }
});

module.exports = model('Pais', PaisSchema);