const { Schema, model } = require('mongoose');

const FamosoTagSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    famoso: { type: Schema.Types.ObjectId, ref: 'Famoso', required: true },
    comentario: { type: String },
    foto: { type: String }, // URL de la foto
    latitud: { type: Number },
    longitud: { type: Number },
    fecha: { type: Date, default: Date.now }
});

module.exports = model('FamosoTag', FamosoTagSchema);