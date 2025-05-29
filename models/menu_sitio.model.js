const { Schema, model } = require('mongoose');

const MenuSitioSchema = new Schema({
    sitio: {
        type: Schema.Types.ObjectId,
        ref: 'Sitio',
        required: true
    },
    plato: {
        type: Schema.Types.ObjectId,
        ref: 'Plato',
        required: true
    },
    valor_plato: {
        type: Number,
        required: true
    }
});

module.exports = model('MenuSitio', MenuSitioSchema);