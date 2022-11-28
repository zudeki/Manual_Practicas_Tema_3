'use strict'

var express = require('express');

var UsuarioControl = require('../controlador/usuarioControl');

var api = express.Router();

api.get('/probando-control', UsuarioControl.prueba);
api.post('/registro', UsuarioControl.registrarUsuario);
api.post('/login', UsuarioControl.accesoUsuario);
api.put('/actualizar-usuario/:id', UsuarioControl.actualizarUsuario);

module.exports = api;