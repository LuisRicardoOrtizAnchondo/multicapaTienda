const express = require('express');
const passport = require('passport');
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const Entrada = require('../models/Entrada');
function register(req, res, next) {
    console.log(req.body);
    try{
        Usuario.register(new Usuario({ username : req.body.username }), req.body.password, function(err) {
            console.log('Fuardadno el usuario');
            if (err) {
                console.log(err);
                return res.render('register', { error : err.message });
            }
            console.log('autenticando');
            passport.authenticate('local')(req, res, function () {
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            });
        });
    }catch(e){
        res.send(e);

    };
}

function saveUser(req, res, next){
	console.log(req.body);
	let usuario = new Usuario(req.body);
	usuario.save(usuario, function(err) {
	    if (err) {
            console.log(err);
            return res.render('register', { error : err.message });
        }else{
        	res.status(200).send('OK!');
        }
	});
}


function getUser(req, res, next){
  let id = req.params.id;
  console.log(id);
    try {
      Usuario.find({username: id}, function (error, usuario) {
          console.log("Obtenindo usuario..." + id);
          if (error) {
              console.log(error);
              return error;
          } else {
              //console.log('USUARIO:'.blue);
              //console.log(usuario);
              //return JSON.parse(usuario);
              res.status(200).json(usuario);
          }
      });
  }catch(e){
      console.log(e);
      return e;
  }
  //res.send(200);
}

function searchUsers(req, res, next){
  let query = req.params.str;
    Usuario.find({username: query}).exec(function(error, usuarios){
      if(error){
        console.log(error);
        return error;
      }else{
        return res.status(200).json(usuarios);
      }
    });
}

function addProduct(req, res, next){
    let idProd = req.params.idProd;
    let canti = req.params.canti;
    //let idPedido = new Object(req.params.pedido);
    let idPedido = req.params.pedido;
    let idUsuario = req.params.idUsuario; //usar username
    try {
        Producto.findById(idProd, function (error, producto) {
            console.log(producto);
            if (error) {
                console.log(error);
            }
            let importe = producto.precio * canti;
            console.log("importe:");
            console.log(importe);
            let entradaBody = {idPedido: idPedido, idProd: idProd, canti: canti, importe: importe};
            let entrada = new Entrada(entradaBody);
            entrada.save(function (err, entradaNueva) {
                if (err) {
                    console.log(err);
                }
                console.log("entrada:");
                console.log(entradaNueva._id);
                Pedido.findById(idPedido, function (e, pedido) {
                    console.log("Pedido:");
                    console.log(pedido);
                    if (e) {
                        console.log(e);
                    }
                    if(pedido.prods) {
                        pedido.prods.push(entradaNueva._id);
                    }
                    pedido.save(function(ee){
                        console.log(ee);
                        res.send(200);
                    });
                })
                //Pedido.findById(idPedido);
            });
        });
    }catch(e){
        console.log(e);
    };
    //Pedido.findByIdAndUpdate(idPedido, );
}

function userPedido(req, res, next){
  let id = req.params.id;
  //if(req.user.role == 'admin' || req.user.id == req.params.id){
    Pedido.find({'username': id}).exec(function(error, pedidos){
      if(error){
        console.log(error);
        return error;
      }else{
        return res.status(200).json(pedidos);
      }
    });
  //}else{
  //  res.status(403).render('error', {error: FORBIDDEN_ERROR });
  //}
}

function modifyUser(req, res, next){
	//curl -X PUT http://localhost:3000/user/Richi -d '{"username":"Richi2", "password":"morenazo96"}' -H 'Content-Type: application/json' 

  let id = req.params.id;
  //if(req.user.role == 'admin' || req.user.id == req.params.id){
    //Usuario.findByIdAndUpdate(id, req.body, function(error, usuarios){
    Usuario.update({"username": id}, req.body, function(error, usuarios){
      if(error){
        console.log(error);
        return error;
      }else{
        //TODO: modificar usuarios (update)
        return res.status(200).json(usuarios);
      }
    });
  /*}else{
    res.status(403).render('error', {error: FORBIDDEN_ERROR });
  }*/
}


function searchModifyUser(req, res, next){
	//curl -X PUT http://localhost:3000/user/Richi -d '{"username":"Richi2", "password":"morenazo96"}' -H 'Content-Type: application/json' 

  let id = req.params.str;
  //if(req.user.role == 'admin' || req.user.id == req.params.id){
    //Usuario.findByIdAndUpdate(id, req.body, function(error, usuarios){
    Usuario.update({"username": {$regex : '.*' + id + '.*'}}, req.body, function(error, usuarios){
      if(error){
        console.log(error);
        return error;
      }else{
        //TODO: modificar usuarios (update)
        return res.status(200).json(usuarios);
      }
    });
  /*}else{
    res.status(403).render('error', {error: FORBIDDEN_ERROR });
  }*/
}

function deleteAllUsers(req, res, next){
	Usuario.remove().exec(function(error, productos){
        if(error){
            console.log(error);
            return error;
        }else{
            return res.status(200).json(productos);
        }
    });
}

function deleteUser(req, res, next){
	Usuario.remove({"username": req.params.id}).exec(function(error, productos){
        if(error){
            console.log(error);
            return error;
        }else{
            return res.status(200).json(productos);
        }
    });
}

function searchDeleteUser(req, res, next){
	Usuario.remove({"username": {$regex: '.*' + req.params.str + '.*'}}, function(error, us){
		if(error){
            console.log(error);
            return error;
        }else{
            return res.status(200).json(us);
        }
	})
}



function userAddStuff(req, res, next){
    let canti = req.params.canti;
    let idProd = req.params.idProd;
    Pedido.findByIdAndUpdate(idProd, req.body, function(error, pedidos){
        if(error){
            console.log(error);
            return error;
        }else{
            return res.status(200).json(productos);
        }
    });
}

module.exports = {
	register,
	getUser,
	searchUsers,
	userPedido,
	modifyUser,
	userAddStuff,
	searchModifyUser,
	deleteAllUsers,
	deleteUser,
	searchDeleteUser,
	saveUser,
	addProduct
}