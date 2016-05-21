
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hola mundo! Saludos desde Valeria Carrillo y Richi Ortiz :v');
});

app.listen(3000, function () {
  console.log('app de ejemplo eschando el puerto 3000!');
});
