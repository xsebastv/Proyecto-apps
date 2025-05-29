const { Schema, model } = require('mongoose');

const VisitaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    sitio: {
        type: Schema.Types.ObjectId,
        ref: 'Sitio',
        required: true
    },
    fecha_visita: {
        type: Date,
        required: true
    },
    comentario: {
        type: String
    }
});

module.exports = model('Visita', VisitaSchema);