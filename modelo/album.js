'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaAlbum = Schema({
    titulo: String,
    Albdescripcion: String,
    año: String,
    imagen: String,
    artista: { type: Schema.ObjectId, ref:"Artista"}
});

module.exports = mongoose.model('Album', EsquemaAlbum);
