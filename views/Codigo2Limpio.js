$(document).ready(
function (){
alert("funciona!");


$("#Ropa").click(function(){
	$("#principal").html("<img src='Images/2.png'></img>"+ "<img src='Images/3.png'></img>" + "<img src='Images/9.png'></img>");


});




$("#Electronicos").click(function(){
	$("#principal").html("<img src='Images/2.png'></img>"+ "<img src='Images/3.png'></img>" + "<img src='Images/9.png'></img>");


});


$("#Figuras").click(function(){
	$("#principal").html("<img src='Images/4.png'></img>"+ "<img src='Images/5.png'></img>" + "<img src='Images/6.png'></img>" + "<img src='Images/8.png'></img>");


});



});//Termina el ready
//);




/*$("#ajax").click(function(){

	$.ajax({
		url: "http://proyecto-web-vale-richi.herokuapp.com/",
		success: function(result, status, xhr){

			/*$("#contenido").html(result);
			$("#contenido").text(JSON.stringify(result));
			$("#contenido").html(result);*/
		/*	$("#contenido").text(JSON.stringify(result));
			//$("#contenido").html(result);

		}


	});
	});*/