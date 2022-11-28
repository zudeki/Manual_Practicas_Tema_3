'use strict'

const bcrypt = require('bcrypt');
const app = require('../app');

var usuariosModelo = require('../modelo/usuarios');



function prueba(req, res){
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api RESt con node y mongo'
    });
}

module.exports= {
    prueba
};

function registrarUsuario(req, res){
    var usuario = new usuariosModelo();

    var params = req.body; //Recibe los datoss por post
    console.log(params);
    usuario.id = params.id
    usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.rol = 'ROLE_USER';
    usuario.imagen = 'null';

    if(params.password){

        bcrypt.hash(params.password, 10, function(err, hash){
            usuario.password = hash;

            if(usuario.nombre != null && usuario.apellido != null && usuario.email != null){
                //guardar el usuario en BD
                usuario.save((err, usuarioAlmacenado) => {
                    if (err){
                        res.status(500).send({mesagge: 'Error al guardar el usuario'});
                    } else {
                        if (!usuarioAlmacenado){
                            res.status(404).send({mesagge: 'No se ha registrado el usuario'});
                        } else{
                        // Nos devuelve un objero con los datos del usuario guardado
                        res.status(200).send({usuarios: usuarioAlmacenado});
                        }
                    }
                });
            } else {
                res.status(200).send({mesagge: 'Introduce todos los campos'});
            }
        });
        //encriptar contraseña y guardar datos
    } else{
        res.status(500).send({mesagge: 'introduce la contraseña'})
    }
}

function accesoUsuario(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({ email: email}, (err, user) =>{
        if (err){
            res.status(500).send({mesagge: 'Error en la peticion'});
        } else{
        } if (!user){
            res.status(404).send({mesagge: 'El usuario no existe'});
        } else{
            bcrypt.compare (password, usuario.password, function (err, check){
                if (check){
                    //Devocer los datos del usuario Logeado
                    console.log('Coincide el password')
                    if (params.gethash){
                        //Devolver un token de jwt
                    } else {
                        res.status(200).send({ user: user});
                    }
                } else{
                    res.status(404).send({mesagge: 'El usuario no se ha identificado'});
                }
            });
        }
    });
}

function actualizarUsuario(req, res) { //PUT
    var userId = req.params.id; //GET
    var update = req.body //POST

    usuariosModelo.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido encontar el usuario' });
            } else {
                res.status(200).send({ user: userUpdate });
            }
        }
    });
}


module.exports={
    prueba, registrarUsuario, accesoUsuario, actualizarUsuario
};
