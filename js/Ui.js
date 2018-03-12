
var listaProd = $("#carrito");

var listaCarrito = $("#listaCarrito");

var lbl_total = $("#lbl_total");

var lbl_subTotal = $("#lbl_subTotal");

var lbl_iva = $("#lbl_iva");

function loadProdsInUi(arr, ti){

	for( i = 0; i < arr.length; i++)
	{

		listaProd.append(
			"<li>" + arr[i].nombre + ", $" + 
			arr[i].precio + '');

			//'<button prod="'+ arr[i].nombre +'" id="btnAdd' + i + '"> add </button> </li>');
		
			$('.add-to-cart').on('click', function(){
			//ti.addProdToCar(1, ti.getProduct($(this).attr("prod")));
			$("#lbl_total").html("Total: " + ti.usuario.carrito.total);
			$("#lbl_iva").html("IVA: " + ti.usuario.carrito.iva);
			$("#lbl_subTotal").html("SubTotal: " + ti.usuario.carrito.subTotal);

			listaCarrito.html("");
			//listaEntradas
			for (var x = 0; x < ti.usuario.carrito.listaEntradas.length; x++) {
				listaCarrito.append("<li>" + ti.usuario.carrito.listaEntradas[x].canti + " " +
					ti.usuario.carrito.listaEntradas[x].producto.nombre +"</li>"
					);
			}
		});
	}
	$('.add-to-cart').on('click', function(response){
		if(response){
			console.log('response: ');
			console.log(response.target.attributes["value"].value);
		}
		console.log('Se agrego un producto al carrito: '+prods[response.target.attributes["value"].value].nombre);
		//globalin = response.target.attributes["value"].value;

		console.log(response);
		tienda.addProd(prods[response.target.attributes["value"].value]);
		listaProd.append(
			"<li>" + prods[response.target.attributes["value"].value].nombre + ", $" + 
			prods[response.target.attributes["value"].value].precio + '');

			//'<button prod="'+ arr[i].nombre +'" id="btnAdd' + i + '"> add </button> </li>');
		
			$('.add-to-cart').on('click', function(){
			tienda.addProdToCar(1, tienda.getProduct($(this).attr("prod")));
			$("#lbl_total").html("Total: " + tienda.usuario.carrito.total);
			$("#lbl_iva").html("IVA: " + tienda.usuario.carrito.iva);
			$("#lbl_subTotal").html("SubTotal: " + tienda.usuario.carrito.subTotal);
			console.log("productin:");
			console.log(prods[response.target.attributes["value"].value]);
			listaCarrito.html("");
				if(tienda.usuario.carrito.listaEntradas[tienda.usuario.carrito.listaEntradas.length-1]["producto"] == prods[response.target.attributes["value"].value]){
					tienda.usuario.carrito.listaEntradas[tienda.usuario.carrito.listaEntradas.length-1].canti++;
				}
			//listaEntradas
			for (var x = 0; x < tienda.usuario.carrito.listaEntradas.length; x++) {
				console.log("comparacion");
				console.log(tienda.usuario.carrito.listaEntradas[x]["producto"]);
				console.log(prods[response.target.attributes["value"].value]);

				listaCarrito.append("<li>" + tienda.usuario.carrito.listaEntradas[x].canti + " " +
					tienda.usuario.carrito.listaEntradas[x].producto.nombre
					);
			}
		});
		//loadProdsInUi(prods[response.target.attributes["value"].value], tienda);
	});
}


// -----------------------------------

loadProdsInUi(tienda.productos, tienda);

//------------------------------------
