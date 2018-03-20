const express = require('express');
const passport = require('passport');
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const Entrada = require('../models/Entrada');
const ATTENTION = '-------------ATTENTION-------------';
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

function getAllUsers(req, res, next){
    Usuario.find({},function(error, usuarios){
        if(error){
            console.log(error);
            return error;
        }else{
            console.log('todos los usuarios');
            console.log(usuarios);
            return res.status(200).json(usuarios);
        }
    });
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
  console.log('Query: ' + query);
    Usuario.find({username: {$regex : '.*' + query + '.*'}}).exec(function(error, usuarios){
      if(error){
        console.log(error);
        return error;
      }else{
        return res.status(200).json(usuarios);
      }
    });
}

function pay(req, res, next){
    let idPedido = req.params.idPedido;
    Pedido.findById(idPedido).exec(function(err, pedido){
        if(pedido.pending == true) {
            pedido.pending = false;
            pedido.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status.send(pedido);
                }
                res.status(200).send('Su pedido ha sido pagado!');
            });
        }else{
            res.status(400).send('Su pedido ya sido pagado ates, no necesita hacerlo de nuevo!');
        }
    });
}

function addProduct(req, res, next){
    let idProd = req.params.idProd;
    let canti = req.params.canti;
    //let idPedido = new Object(req.params.pedido);
    //let idPedido = req.params.pedido;
    let idUsuario = req.params.id; //usar username
    //pedidin.push(producto);
    Pedido.findOne({user: idUsuario, pending : true}, function (e, pedido) {
        console.log("pendientes:");
        console.log(pedido);
        //if(pedido == []) {
            //Crear un pedido si no hay uno pendiente
            Producto.findById(idProd, function (error, producto) {
                console.log(producto);
                if (error) {
                    console.log(error);
                }
                let importe = producto.precio;
                let total = 0;
                let subTotal = 0;
                if(pedido == null) {
                    console.log('No hay pedidos pendientes, creando uno nuevo...');
                    let pedidoBody = {user: idUsuario, total: total, iva: 15, subTotal: subTotal};
                    let pedido = new Pedido(pedidoBody);
                    //let importe = producto.precio * canti;
                    console.log("importe:");
                    console.log(importe);
                    let entradaBody = {Producto: idProd, cantidad: canti, importe: importe};
                    console.log('entradaBody:');
                    console.log(entradaBody);
                    let entrada = new Entrada(entradaBody);
                    entrada.save(function (err, entradaNueva) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("entrada:");
                        console.log(entradaNueva._id);
                        pedido.prods.push(idProd);
                        pedido.subTotal += entrada.importe * entrada.cantidad;
                        pedido.total += (entrada.importe * entrada.cantidad) + ((entrada.importe * entrada.cantidad) * 0.15);
                        pedido.save();
                        //{'_id': idUsuario, 'pedidos.pending': true}
                        res.send(pedido.populate('prods'));
                        Usuario.findById(idUsuario).exec(function (errUsuario, usuario) {
                            console.log(usuario);
                            console.log(pedido);
                            usuario.pedidos.push(pedido._id);
                            usuario.save();
                        });

                    })
                    //Pedido.findById(idPedido);
                }else{
                    console.log('Hay un pedido pendiente, retomando...');
                    console.log(pedido);
                    console.log("importe:");
                    console.log(importe);
                    let entradaBody = {Producto: idProd, cantidad: canti, importe: importe};
                    console.log('entradaBody:');
                    console.log(entradaBody);
                    let entrada = new Entrada(entradaBody);
                    pedido.prods.push(entrada);
                    console.log('dinero:');
                    console.log(entrada);
                    pedido.subTotal += entrada.importe * entrada.cantidad;
                    console.log('subTotal:');
                    console.log(pedido.subTotal);
                    pedido.total += (entrada.importe * entrada.cantidad) + ((entrada.importe * entrada.cantidad) * 0.15);
                    console.log('Total:');
                    console.log(pedido.total);
                    pedido.save(function(er,ok){
                        console.log('Pedidididido:');
                        console.log(pedido);
                        entrada.save(function (err, entradaNueva) {
                            if (err) {
                                console.log(err);
                            }
                            console.log("entrada:");
                            console.log(entradaNueva._id);
                            pedido.save();
                            res.send(pedido.populate('prods'));
                            //{'_id': idUsuario, 'pedidos.pending': true}
                            Usuario.findById(idUsuario).exec(function (errUsuario, usuario) {
                                console.log(usuario);
                                console.log(pedido);
                                usuario.pedidos.push(pedido._id);
                                usuario.save();
                            });
                        });
                    });

                }
            });
    });
/*
    try {
        Usuario.find({'username': idUsuario, 'pedidos.pending': true}).exec(function(errUsuario, usuario){
           //if(usuario.pedidos[i].pending == true){

            //}
            console.log('usuario:::');
            console.log(usuario);
            res.send(usuario);
        });
        //Pedido.find({user: idUsuario})


       // });
    }catch(e){
        console.log(e);
        res.send(e);
    };*/
    //Pedido.findByIdAndUpdate(idPedido, );
}

function getUserProducts(req, res, next){
    let idPedido = req.params.pedido;
    let idUsuario = req.params.id; //usar username
    Usuario.findById(idUsuario,function(err, usuario){
        Pedido.findById(idPedido, function(error,pedido){
            if(error){
                console.log(error);
            }
            //TODO: use populate
            let productsArray = [];
            
            /*Producto.populate(pedido, , function(e, prods){
                res.status(200).json(prods);
            });*/
            //res.status(200).json(pedido.prods);

        })
    });
}

function userPedido(req, res, next){
  let idUsuario = req.params.id;
  //if(req.user.role == 'admin' || req.user.id == req.params.id){
    Pedido.find({'user': idUsuario}).exec(function(error, pedidos){
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

function usuarioPedido(req, res, next){
    let id = req.params.id;
    let idPedido = req.params.pedido;
    //if(req.user.role == 'admin' || req.user.id == req.params.id){
    Pedido.find({'user': id, '_id': idPedido}).exec(function(error, pedido){
        if(error){
            console.log(error);
            return error;
        }else{
            console.log("Pedido con usuario especificos:");
            console.log(pedido);
            //pedidos.findById(idPedido, function(e, pedido){
                return res.status(200).json(pedido);
            //})
        }
    });
    //}else{
    //  res.status(403).render('error', {error: FORBIDDEN_ERROR });
    //}
}

function userPedidoProds(req, res, next){
    let id = req.params.id;
    let idPedido = req.params.pedido;
    //if(req.user.role == 'admin' || req.user.id == req.params.id){
    Pedido.findOne({'user': id, '_id': idPedido}).exec(function(error, pedido){
        if(error){
            console.log(error);
            return error;
        }else{
            console.log("Pedido con usuario especificos:");
            console.log(pedido);
            //pedidos.findById(idPedido, function(e, pedido){
            return res.status(200).json(pedido.prods);
            //})
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

function deleteProd(req, res, next){
    let id = req.params.id;
    let idPedido = req.params.idPedido;
    let idProd = req.params.idProd;
    Usuario.findById(id, function(err, usuario){
        Pedido.findOne({user:id, _id:idPedido}, function(e, pedido){
            console.log('ESTE es el pedido:');
            console.log(pedido);
            pedido.prods.splice(idProd, 1);
            pedido.save();
            res.send('Producto eliminado de su pedido (carrito)');
        });
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

function deletePedido(req, res, next){
    let id = req.params.id;
    console.log('PARAMS:');
    console.log(req.params);
    let idPedido = req.params.idPedido;
    try {
            Pedido.findByIdAndRemove(idPedido, function (e, pedidos) {
                console.log(pedidos);
                //res.send(200).json(pedidos);
                res.send('Eliminacion exitosa!');
                Usuario.findById(id).exec(function(e, usuario){
                    usuario.pedidos.splice(idPedido, 1);
                    usuario.save();
                });
            });
    }catch(e){
        res.send('Nada hay que eliminar por el momento');
    }
}

module.exports = {
	register,
	getUser,
    getAllUsers,
	searchUsers,
	userPedido,
    usuarioPedido,
	modifyUser,
	userAddStuff,
	searchModifyUser,
	deleteAllUsers,
	deleteUser,
	searchDeleteUser,
	saveUser,
	addProduct,
    getUserProducts,
    deletePedido,
    deleteProd,
    pay,
    userPedidoProds
}