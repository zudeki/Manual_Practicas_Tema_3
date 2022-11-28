'use strict'

var express = require ('express');
var bodyParser = require('body-parser');

var app = express();

var user_routes = require('./rutas/usuarioRuta');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabecera HTTP

//Rutas base

app.use('/api', user_routes);


/*
app.get('/pruebas', function(req, res){
    res.status(200).send({mesage: 'Bienvenido al curso mio'});
})
*/

module.exports = app;