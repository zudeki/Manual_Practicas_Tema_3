'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaCancion = Schema({
    numero: String,
    nombre: String,
    duracion: String,
    file: String,
    album: { type: Schema.ObjetId, ref: "Album"}
});

module.exports = mongoose.model('Cancion', EsquemaCancion);