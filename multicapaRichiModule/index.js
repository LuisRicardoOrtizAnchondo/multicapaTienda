const request = require('request');

exports.printMsg = function() {
  console.log("Multicapa module found!");
}

exports.getUsers = function() {
	console.log('Haciendo peticion a /user/');
	request.get('http://www.richibuenaondaortizmulticapa.bid:3000/user/', function(e, users){
		console.log(users.body);
		return users;
	});
}

exports.getProducts = function() {
	console.log('Haciendo peticion a /productos/');
	request.get('http://www.richibuenaondaortizmulticapa.bid:3000/products/', function(e, products){
		console.log(products.body);
		return users;
	});
}

exports.postProduct = function(body) {
	console.log('Haciendo peticion a /productos/');
	request.post('http://www.richibuenaondaortizmulticapa.bid:3000/products/new', body, function(e, response){
		console.log(response.body);
		return users;
	});
}
