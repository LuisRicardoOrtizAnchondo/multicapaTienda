const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Subject = require('../models/subject')
const Producto = require('../models/Producto');


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
//Punto extra <3
function getProducts(req, res, next){
	let page = Number(req.params.page);
	let limit = Number(req.params.size);
	let skip = (page * size) - size
	Producto.find().limit(limit).skip(skip).exec(function(error, productos){
		if(error){
			console.log(error);
			return error;
		}else{
			return res.status(200).json(productos);
		}
	});
}

function getOneProduct(req, res, next){
	let idProduct = req.params.id;
	Producto.find(idProduct).exec(function(error, producto){
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
		Producto.find({name: query}}).exec(function(error, productos){
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
	if(req.usuario.role == 'admin'){
		let id = req.body.id;
			Producto.find({name: query}).exec(function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				return res.status(200).json(productos);
			}
		});
	}else{
		res.status(403).render('error', {error: 'Necesita permisos de admin para realizar esta accion'});
	}
}

function deleteAllProducts(req, res, next){
	if(req.usuario.role == 'admin'){
		let id = req.body.id;
			Producto.find().exec(function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				//Delete ALL those items
				return res.status(200).json(productos);
			}
		});
	}else{
		res.status(403).render('error', {error: 'Necesita permisos de admin para realizar esta accion'});
	}
}

function deleteProduct(req, res, next){
	if(req.usuario.role == 'admin'){
		let id = req.body.id;
		Producto.find().exec(function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				//Delete ALL those items
				return res.status(200).json(productos);
			}
		});
	}else{
		res.status(403).render('error', {error: 'Necesita permisos de admin para realizar esta accion'});
	}
}

function createProduct(req, res, next){
	let product = req.body;

}

module.exports = {
	getAllProducts,
	getProducts,
	getOneProduct,
	searchProducts,
	modifyProduct,
	deleteAllProducts,
	deleteProduct
}