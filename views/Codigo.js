$(document).ready(
function (){
alert("funciona!");


$("#Buscar").click(function(){


	var query = $("#Buscador").val();
	$("#principal").html(query);


});

$("#Ropa").click(function(){
	//$("#principal").html("<div id='cuadrito'><div class='cuadro'><img src='Images/2.png'></img></div>" + "<div class='cuadro'><img src='Images/3.png'></img></div>" + "<div class='cuadro'><img src='Images/9.png'></img></div></div>");

	$("#principal").html("<br/><br/><br/><div id'cuadrito'><img src='Images/2.png'></img>"+ "<img src='Images/3.png'></img>" + "<img src='Images/9.png'></img>");
/*
$("#leer").click(function actualizarE(){
    $.ajax({
      url: "http://proyecto-web-vale-richi.herokuapp.com/",
      success: function (result, status, xhr) {
      	$("#contenido").empty().css("opacity", 1);
      	$("#contenido").append(
      		//"<td><th>Matricula</th></td>" + "<td><th>Nombre</th></td>" + "<td><th>Apellido</th></td>"
      		"<table></table>"
      		);
          
          var tbody = $("<tbody></tbody>");
          $("table").append(tbody);
          
        for (var i = 0; i < 5000; i++) {
            var tr = $('<tr></tr>');
          
             
          tr.html(
              "<td>" + result[i].id + "</td>"+
              "<td>"+ result[i].registration_number + "</td>"+ 
              "<td> " + result[i].name +"  </td>"+
              "<td> " + result[i].last_name + "</td>"+
              "<td>" + result[i].status + "</td>" 
              
          );
            tr.append(modificar);
            tr.append(el);
            tbody.append(tr);
            el.click(function() {
        var id= $(this).prev().prev().prev().prev().prev().text();
        //alert(id);
        //alert("probando probando");
        actualizarE();
        
        $.ajax({
            url: "http://proyecto-web-vale-richi.herokuapp.com/",
            method: "POST",
            data: "_method=DELETE",
            success: function (result, status, xhr) {
                alert("Éxito");
                i=5000;
                actualizarE();
                window.actualizarE();
        },
         error: function(xhr){
            alert("Error: " + xhr.status + " " + xhr.statusText);
        },
     });
       
    });
            
        };
          
          

      },
       error: function(xhr){
            alert("Error: " + xhr.status + " " + xhr.statusText);
        },
    });





  });//Termina "leer"
*/

});




$("#Electronicos").click(function(){
	$("#principal").html("<div id'cuadrito'><img src='Images/e1.png'></img>"+ "<img src='Images/e2.png'></img>" + "<img src='Images/e3.png'></img>" + "<img src='Images/e4.png'></img></div>");


});


$("#Figuras").click(function(){
	$("#principal").html("<div id='cuadrito'><img src='Images/4.png'></img>"+ "<img src='Images/5.png'></img>" + "<img src='Images/6.png'></img>" + "<img src='Images/8.png'></img></div>");


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