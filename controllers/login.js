const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Subject = require('../models/subject')

function index(req, res, next){

  if (req.user) {
    Subject.find({'owner' : req.user._id}, (err, subjects) => {
      res.render('index', { user : req.user, subjects: subjects });
    });
  } else {
    res.render('index', {});
  }

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

function subscribe(req, res, next) {
    Account.register(new Account({ username : req.body.username, email: req.body.email }), req.body.password, (err, account) => {
        if (err) {
          return res.render('index', { error : err.message });
        }
        passport.authenticate('local')(req, res, () => {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
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



module.exports ={
  index,
  subscribe,
  logout,
  error,
  auth
};