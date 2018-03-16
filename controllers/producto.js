const express = require('express');
const passport = require('passport');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const FORBIDDEN_ERROR = 'Necesita permisos de admin para realizar esta accion';

/*
Using nombre as ID por comodidad (Most cases)
*/

function getAllProducts(req, res, next){
	Producto.find().exec(function(error, productos){
		if(error){
			console.log(error);
			return error;
		}else{
			return res.status(200).json(productos);
		}
	});
}
//Punto extra <3 (Pagination) selenium?
function getProducts(req, res, next){
	let page = Number(req.params.page);
	let limit = Number(req.params.size);
	let skip = (page * limit) - limit;
    console.log('Obteniendo productos...');
	Producto.find().limit(limit).skip(skip).exec(function(error, productos){
		console.log(productos);
		if(error){
			console.log(error);
			res.render('index', {error: error});
			return error;
		}else{
			return res.status(200).json(productos);
		}
	});
}

function getOneProduct(req, res, next){
	let idProduct = req.params.id;
	//Producto.find({nombre: idProduct}).exec(function(error, producto){
	Producto.findById(idProduct).exec(function(error, producto){
		if(error){
			console.log(error);
			return error;
		}else{
			return res.status(200).json(producto);
		}
	});
}

function searchProducts(req, res, next){
	let query = req.params.str;
		Producto.find({nombre: { $regex: '.*' + query + '.*' }}).exec(function(error, productos){
		if(error){
			console.log(error);
			return error;
		}else{
			return res.status(200).json(productos);
		}
	});
}

function searchProductsModify(req, res, next){
    let query = req.params.str;
    Producto.update({nombre: { $regex: '.*' + query + '.*' }}, req.body,function(error, productos){
        if(error){
            console.log(error);
            return error;
        }else{
            return res.status(200).json(productos);
        }
    });
}

function searchProductsDelete(req, res, next){
    let query = req.params.str;
    Producto.remove({nombre: { $regex: '.*' + query + '.*' }}).exec(function(error, productos){
        if(error){
            console.log(error);
            return error;
        }else{
            return res.status(200).json(productos);
        }
    });
}

//TODO: create middleware that checks if user is admin to delete and modify
function modifyProduct(req, res, next){
	//if(req.usuario.role == 'admin'){
		let id = req.params.id;
			Producto.findByIdAndUpdate(id, req.body, function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				return res.status(200).json(productos);
			}
		});
	//}else{
		//res.status(403).render('error', {error: 'Necesita permisos de admin para realizar esta accion'});
	//}
}

function deleteAllProducts(req, res, next){
	//if(req.usuario.role == 'admin'){
		//let id = req.body.id;
			Producto.remove().exec(function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				//Delete ALL those items
				return res.status(200).json(productos);
			}
		});
	//}else{
	//	res.status(403).render('error', {error: FORBIDDEN_ERROR });
	//}
}

function deleteProduct(req, res, next){
	//if(req.usuario.role == 'admin'){
		let id = req.params.id;
		console.log(id);
		Producto.findByIdAndRemove(id).exec(function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				//Delete ALL those items
				return res.status(200).json(productos);
			}
		});
	//}else{
	//	res.status(403).render('error', {error: FORBIDDEN_ERROR });
	//}
}
//Test it!
//curl -X POST http://localhost:3000/productos/new -d '{"nombre" : "donitas", "precio": "10"}' -H 'Content-Type: application/json'
function createProduct(req, res, next){
	let product = new Producto(req.body);
	//if(req.usuario.role == 'admin'){
	console.log(product);
		product.save(product, function (error, exito){
			if(error){
				console.log(error);
				res.status(500);
			}
			console.log(exito);
            res.status(201).render('index', {message: 'Producto creado exitosamente!'});
		});
	//}else{
	//	res.status(403).render('error', {error: FORBIDDEN_ERROR });
	//}
}

module.exports = {
	getAllProducts,
	getProducts,
	getOneProduct,
	searchProducts,
	modifyProduct,
    searchProductsModify,
    searchProductsDelete,
	deleteAllProducts,
	deleteProduct,
	createProduct
}