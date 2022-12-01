'use strict'

const bcrypt = require('bcrypt');
var usuariosModelo = require('../modelo/usuarios');
var usuarios = new usuariosModelo();
var jwt = require('../servicio/jwt');
var fs = require('fs');
var path = require('path');



function prueba(req, res){
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api RESt con node y mongo'
    });
}

module.exports= {
    prueba
};

function registrarUsuario(req, res){
    var params = req.body; //recibe todos los datos por Por el Metodo POST
    console.log(params);
    usuarios.nombre = params.nombre;
    usuarios.apellido = params.apellido;
    usuarios.email = params.email;
    usuarios.rol = 'ROLE_ADMIN';
    usuarios.imagen = 'null';

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuarios.password = hash;
            if (usuarios.nombre != null && usuarios.apellido != null && usuarios.email != null) {
                //guardar el ususario en BD
                usuarios.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'No se ha registrado el usuario' });
                        } else {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ usuarios: usuarioAlmacenado });
                            console.log(usuarioAlmacenado);
                        }
                    }
                });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });

    } else {
        res.status(404).send({ mesagge: 'Introduce la contraseña' });
    }

}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion al servidor' });
        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, usuarios.password, function(err, check) {
                    if (check) {
                        //devolver los datos del ususario logeado
                        console.log('coincide el password')
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                            //devolver un token de jwt
                        } else {
                            res.status(200).send({ user: user });
                        }
                    } else {
                        res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                    }
                });
            }
        }
    });
}

module.exports={
    prueba, registrarUsuario, accesoUsuario
};
