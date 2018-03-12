

class Entrada {

	constructor(canti, prod) {

		this.producto = prod;
		this.canti = canti;
		this.importe = canti * prod.precio;
	}
}



class Dao {

	constructor (entity){}

	save(entity){ }

	delete(entity){ }

	update(entity){ }

	getAll(){ }

	getOne(id){ }
}


class Tienda
{
	
	constructor() {

		//this.dao = new Dao(producto);
		this.usuario = new Usuario();
		this.productos = [];
		/*
			rest en el server que descargue los productos
		*/
	}


	getProduct(nom){

		for(i = 0; i< this.productos.length; i++)
			if(this.productos[i].nombre == nom)
				return this.productos[i];
		
		//return dao.getOne(nom);

		return null;
	}


	addProd(prod){
		this.productos.push(prod);

		//dao.save(prod);
	}


	addProdToCar(c, p){

		//var entrada = new Entrada(c, p);
		//entrada.canti = c;
		//entrada.producto = p;

		//this.usuario.carrito.addEntrada(entrada);
		
		//this.usuario.carrito.updateProd(entrada);

		this.upDateProdInCar(c, p);
	}

	upDateProdInCar(c, p){

		var entrada = new Entrada(c, p);
		this.usuario.carrito.updateProd(entrada);
	}



}


class Producto {

	constructor(nom, pre) {

		this.nombre = "";
		this.precio = 0.0;
	}
}



class Usuario {

	constructor(nom) {

		this.nombre = nom;
		this.carrito = new Carrito();
	}
}


class Carrito {

	constructor () {

		this.total = 0.0;
		this.subTotal = 0.0;
		this.iva = 0.0;
		this.listaEntradas = []; //son entradas
	}

	getListProdInCar()
	{

		return this.listaEntradas;
	}


	deleteProd(prod)
	{
		if(prod != undefined)
			for(var i = 0; i < this.listaEntradas.length; i++)			
				if(prod.nombre == this.listaEntradas[i].producto.nombre){

					this.totalizar(this.listaEntradas[i].importe, -1);
					this.listaEntradas.splice(i, 1);
					break;
				}
			
	}

	updateProd(e) {

		this.deleteProd(e.producto);
		this.addEntrada(e);
	}

	totalizar(importe, signo) {

			this.subTotal+= (importe * signo);
			this.iva = this.subTotal * 0.16;
			this.total = this.iva + this.subTotal;			
	}

	addEntrada(e)
	{
		this.listaEntradas.push(e);
		this.totalizar(e.importe, 1);
	}
}










