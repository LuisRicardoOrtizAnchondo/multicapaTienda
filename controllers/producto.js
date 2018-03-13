const express = require('express');
const passport = require('passport');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const FORBIDDEN_ERROR = 'Necesita permisos de admin para realizar esta accion';

function getAllProducts(req, res, next){
	Producto.findById().exec(function(error, productos){
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
		Producto.find({name: query}).exec(function(error, productos){
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
			Producto.findById(id).exec(function(error, productos){
			if(error){
				console.log(error);
				return error;
			}else{
				//Delete ALL those items
				return res.status(200).json(productos);
			}
		});
	}else{
		res.status(403).render('error', {error: FORBIDDEN_ERROR });
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
		res.status(403).render('error', {error: FORBIDDEN_ERROR });
	}
}

function createProduct(req, res, next){
	let product = req.body;
	if(req.usuario.role == 'admin'){

	}else{
		res.status(403).render('error', {error: FORBIDDEN_ERROR });
	}
}

module.exports = {
	getAllProducts,
	getProducts,
	getOneProduct,
	searchProducts,
	modifyProduct,
	deleteAllProducts,
	deleteProduct,
	createProduct
}