const { Schema, model } = require('mongoose');

const TagSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String
    }
});

module.exports = model('Tag', TagSchema);