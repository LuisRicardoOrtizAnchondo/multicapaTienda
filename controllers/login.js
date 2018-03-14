const express = require('express');
const passport = require('passport');
const Usuario = require('../models/Usuario');
const FORBIDDEN_ERROR = 'Necesita permisos de admin para realizar esta accion';

function index(req, res, next){

  /*if (req.user) {
    Subject.find({'owner' : req.user._id}, (err, subjects) => {
      res.render('index', { user : req.user, subjects: subjects });
    });
  }else {
    res.render('index', {});
  }*/

  // let subjects = [
  //   {name: "Matemáticas", teacher: "Rosa Palazuelos", schedule: [{day: "Miercoles", start: "10:00", end: "11:00"}, {day: "Viernes", start: "12:00", end: "13:00"}], classroom: "E-27", color: "pink"},
  //   {name: "Biología", teacher: "Ramón López", schedule: [{day: "Martes", start: "09:00", end: "10:00"}, {day: "Jueves", start: "09:00", end: "10:00"}], classroom: "E-27", color: "grey"},
  //   {name: "Física", teacher: "Lorenzo Armendariz", schedule: [{day: "Lunes", start: "10:00", end: "11:00"}, {day: "Miercoles", start: "12:00", end: "13:00"}], classroom: "E-27", color: "yellow"},
  //   {name: "Química", teacher: "Teresa González", schedule: [{day: "Lunes", start: "11:00", end: "12:00"}, {day: "Martes", start: "10:00", end: "11:00"}, {day: "Jueves", start: "08:00", end: "09:00"}], classroom: "F-31", color: "green"}
  // ];

  // res.render('index', { user : req.user, subjects: subjects });
  // if (req.user) {
  //   let subjects = Subject.find({'owner' : req.user._id})
  //   res.render('index', { user : req.user, subjects: subjects });
  // } else {
  //   res.render('index', {});
  // }
}

function registerView(req, res, next) {
    res.render('register');
}

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
                    res.redirect('/');
                });
            });
        });
    }catch(e){
        res.send(e);

    };
}

function loginView(req, res, next) {
    res.render('login');
    return 'Pagina Renderizada!';
}


function logout(req, res, next) {
    //As seen in passport's documentation
    req.logout();
    res.redirect('/');
}

function error(req, res, next) {
  res.render('index', {error: "Usuario o contraseña incorrecta"});
}

function auth(req, res, next){
  if (req.user) {
    next()
  } else {
    res.redirect('/')
  }
}
/*pruebas de aceptacion
toast error?
informaicon de perfil
loginpublicaicon*/
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
              return JSON.parse(usuario);
              res.status(200).json(usuario);
          }
      });
  }catch(e){
      console.log(e);
      return e;
  }
  //res.send(200);
}
/*
function getUser(req, res, next) {
  if(req.user.role == 'admin' || req.user.id == req.params.id){
    let id = req.params.id;
    Usuario.find(id).exec(function(error, user){
      if(error){
        console.log(error);
        return error;
      }else{
        //Delete ALL those items
        return res.status(200).json(user);
      }
    });
  }else{
    res.status(403).render('error', {error: FORBIDDEN_ERROR });
  }
  //res.render('index', {error: "Usuario o contraseña incorrecta"});
}*/

function searchUsers(req, res, next){
  let query = req.params.str;
    Usuario.find({name: query}).exec(function(error, usuarios){
      if(error){
        console.log(error);
        return error;
      }else{
        return res.status(200).json(usuarios);
      }
    });
}

function userPedido(req, res, next){
  let id = req.params.id;
  if(req.user.role == 'admin' || req.user.id == req.params.id){
    Pedido.find({'user': id}).exec(function(error, pedidos){
      if(error){
        console.log(error);
        return error;
      }else{
        return res.status(200).json(pedidos);
      }
    });
  }else{
    res.status(403).render('error', {error: FORBIDDEN_ERROR });
  }
}

function userPedidoEspecifico(req, res, next){
  let id = req.params.id;
  if(req.user.role == 'admin' || req.user.id == req.params.id){
    Pedido.find({'user': id, '_id': idPedido}).exec(function(error, pedidos){
      if(error){
        console.log(error);
        return error;
      }else{
        return res.status(200).json(pedidos);
      }
    });
  }else{
    res.status(403).render('error', {error: FORBIDDEN_ERROR });
  }
}

function modifyUser(req, res, next){
  let id = req.params.id;
  if(req.user.role == 'admin' || req.user.id == req.params.id){
    Usuario.find(id).exec(function(error, usuarios){
      if(error){
        console.log(error);
        return error;
      }else{
        //TODO: modificar usuarios (update)
        return res.status(200).json(usuarios);
      }
    });
  }else{
    res.status(403).render('error', {error: FORBIDDEN_ERROR });
  }
}

module.exports ={
  index,
  registerView,
  register,
  //login,
  loginView,
  logout,
  error,
  auth,
  getUser,
  searchUsers,
  userPedido,
  userPedidoEspecifico
};