const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const port = process.env.PORT || 3000;
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const path = require('path');
const usuario = require('./routes/usuario');
const producto = require('./routes/producto');
const pedido = require('./routes/pedido');
const entrada = require('./routes/entrada');
const engines = require('consolidate');


app.engine('html', engines.hogan);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// passport config
/*
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join('public')));
var Usuario = require('./models/Usuario');
passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());



//facebook stuff
passport.use(new FacebookStrategy({
        clientID: '292701184584377',
        clientSecret: 'd300560cd0a7422e557cffa00124cd88',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            if(err){
                console.log("Error con facebook: " + err);
            }
            if(user){
                return cb(err, user);
            }else{
                let usuario = new usuario();
                usuario.facebook.id = profile.id;
                acccount.facebook.token = accessToken;
                usuario.facebook.name = profile.givenName + ' ' + profile.familyName;
                usuario.facebook.email = profile.emails[0].value();

                usuario.save(function (err) {
                    if(err){
                        console.log("Error al salvar desde facebook: " + err);
                    }
                    return cb(err, usuario);
                })
            }
        });
    }
));
*/
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', login);
//RUTAS
app.use('/productos', producto);
app.use('/user', usuario);
app.use('/pedido', pedido);
app.use('/entrada', entrada);
//Conexion con base

var server = app.listen(port, function () {
    var port = server.address().port;
    console.log('API en ejecucion en el puerto', port, 'Lol');
});

/*Habilitar cors */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, DELETE, PATCH, GET");
    next();
});
/*
app.post('/productos', function(req, res){
    var producto = {
		nombre_producto: req.body.nombre_producto,
		descripcion: req.body.descripcion,
		precio: req.body.precio
	};
    pg.connect(conString, function (error, client, done) {
        if (error) {
            res.status(500).json({
                "success": false,
				"message": error
            });
            return console.log(error);
        }
        var query = client.query("INSERT INTO producto (nombre_producto, descripcion, precio) values ($1, $2, $3)", [producto.nombre_producto, producto.descripcion, producto.precio]);
        query.on('error', function(){
            done();
            res.status(400).send({error: true});
        });
        query.on('end',function(){
            done();
            res.status(200).json(producto);
        });
    });
});

app.delete('/productos/:id', function (req, res) {
	var producto_id = req.params.id;
	pg.connect(conString, function (error, client, done) {
		client.query("DELETE FROM PRODUCTO WHERE producto_id = $1",[producto_id], function(err, result) {
			if (err) {
				console.error("Error al borrar el producto",err);
				res.status(500).send("Error al borrar el producto.");
			}
			else {
				res.status(204).send("¿Existe?");
			}
				
		})
	});
});

app.get('/productos', function(req, res){
    pg.connect(conString, function (error, client, done) {
    var query = client.query("SELECT * FROM producto",[], function (err, result) {
		done();
		if(err) {
			res.status(500).json({
                "success": false
                , "message": error
            });
			return console.error('Error recuperando productos', err);
		}else {
			res.status(200).json(result.rows);
		}
	});
    });
});

app.post('/productos/search', function(req, res){
    var producto = req.body.nombre_producto;
    pg.connect(conString, function (error, client, done) {
    var query = client.query("SELECT * FROM producto WHERE nombre_producto LIKE $1", ["%"+producto+"%"], function (err, result) {
		done();
		if(err) {
			res.status(500).json({
                "success": false
                , "message": err
            });
			return console.error('Error al recuperar el producto '+producto);
		}
		else {
			res.status(200).json(result.rows);
		}
	});
    });
});

app.post('/ticket', function(req,res){
    var ticket = {
      "comprador_id" : req.body.comprador_id,
        "producto_id" : req.body.producto_id,
        "cantidad" : req.body.cantidad
    };
    pg.connect(conString, function (error, client, done) {
            done();
    if (error) {
            console.log(error);
            res.status(500).json({
                "success": false
                , "message": error
            });
        }
        var query = client.query("INSERT INTO ventas (comprador_id, producto_id, cantidad) values ($1,$2,$3)", [ticket.comprador_id, ticket.producto_id,ticket.cantidad]);
        
        query.on('error', function(error){
            done();
            console.log(error);
            res.sendStatus(400);
        });
        query.on('end',function(){
            done();
            res.status(200).json(ticket);
        });
    });
});

app.get('/ticket', function(req,res){
    pg.connect(conString, function (error, client, done) {
    if (error) {
            done();
            console.error(error);
        }
        var query = client.query("SELECT * FROM ventas",[],function (err, result) {
			done();
			if (err) {
				res.status(500).json({
                "success": false
                , "message": error
            });
				return console.error('Error recuperando tickets',err);}
			else
				res.status(200).json(result.rows);
		});
    });
});

app.get('/ticket/:id', function(req,res){
	var comprador_id = req.params.id;
    pg.connect(conString, function (error, client, done) {
    if (error) {
            done();
            console.error(error);
        }
        var query = client.query("SELECT * FROM ventas WHERE comprador_id = $1",[comprador_id],function (err, result) {
			done();
			if (err) {
				res.status(500).json({
                "success": false
                , "message": error
            });
				return console.error('Error recuperando tickets',err);}
			else
				res.status(200).json(result.rows);
		});
    });
});

app.post('/compradores', function(req,res){
    var ticket = {
      "nombre" : req.body.nombre,
        "tarjeta" : req.body.tarjeta
    };
    pg.connect(conString, function (error, client, done) {
            done();
    if (error) {
            console.error(error);
        }
        var query = client.query("INSERT INTO comprador(nombre, tarjeta) values ($1,$2)", [ticket.nombre, ticket.tarjeta], function (err, result) {
				done();
			if (err){
				res.sendStatus(400);
				return console.error('Error al crear usuario',err);
			}
			else {
				res.status(200).json(ticket);
			}
		});
    });
});

app.post('/compradores/search', function(req, res){
    var comprador_id = req.body.id;
    pg.connect(conString, function (error, client, done) {
    var query = client.query(
		"SELECT * FROM comprador WHERE comprador_id = $1",
		[comprador_id],
		function (err, result) {
			done();
			if(err) {
				res.status(500).json({
					"success": false,
					"message": err
				});
				return console.error('Error al recuperar el comprador', comprador_id);
			}
			else {
				res.status(200).json(result.rows);
			}
		});
    });
});

app.delete('/compradores/:id', function (req, res) {
	var comprador_id = req.params.id;
	pg.connect(conString, function (error, client, done) {
		client.query("DELETE FROM COMPRADOR WHERE comprador_id = $1", [comprador_id], function (err, result) {
			if (err) {
				console.error("Error al borrar el comprador",err);
				res.status(500).send("Error al borrar el comprador.");
			}
			else {
				res.status(204).send("¿Existe?");
			}
				
		})
	});
});
*/
module.exports = app;