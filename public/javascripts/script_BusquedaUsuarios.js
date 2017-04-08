function controllerAngular($scope)//ControllerAngular
 {
	$scope.criterio = "identificacion";
	$scope.usuarios = new Array();
	$scope.updateUsuarios = c => $scope.usuarios = c;
	$scope.buscar = _ => busquedaUsuario($scope);
	$scope.clear = _ => limpiaDivMensaje($scope);
	$scope.obtenerUsuario	= n => asignarUsuario($scope, n);
    $scope.obtenerUsuarios	= s => asignarUsuario2($scope, s);	
	$scope.eliminarUsuarios	= e => eliminarUsuarios($scope, e); 
	$scope.actualiza =_ => actualizarInfo($scope);
	$scope.usuario = JSON.parse(localStorage.getItem('usuario'));
	$scope.esDisabled = id => id ===$scope.usuario.Id;//id.localeCompare($scope.usuario.Id) === 0;
  }
  
  
  function actualizarInfo($scope){ //Actualiza la informacion en la base de datos
  //console.log('validacion '+validar());
    if(validar()){
	//console.log('Entro despues de validacion'+validar()); // Quitar
	actualizarPersona();
	actualizarUsuario();
    busquedaUsuario($scope);
    usr = JSON.parse(localStorage.getItem('usuario'));
    id = $('#IU0').val().toUpperCase();
    if(usr.Id === id)
    {
    	solicitarInformacionDeSesion();
    }
	$('#myModal').modal('hide'); 
	}
  }
  
  function actualizarPersona(){ //actualiza la infromación del usuario en la tabla personas
    let a = $('#IU0').val().toUpperCase();
	let b = $('#IU1').val().toUpperCase();
	let c = $('#IU2').val().toUpperCase(); 
	let d = $('#IU3').val().toUpperCase(); 
 
   fetch( 'http://' + ip + ':'+ puerto +'/api/TP/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_1="+ b+ "&TP_2="+c+
	"&TP_3="+ d + "&TP_4="+ a 
      }
	  )
  .then(function(response) {
		return response.text().then(function(res) {
				console.log("Resultado: "+res);
					if(res.indexOf("error")==-1){
						$("#mensaje").text("Acción realizada con éxito");
			}
				});
	})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
  }
  
  
  function actualizarUsuario(){ //actualiza la informaciòn del usuario
    let a = $('#IU0').val();
	let b = $('#IU4').val();
	
	let c = 0;
	if($("#administrador_checkbox").prop("checked"))
		c = 1;
		
		
    fetch( 'http://' + ip + ':'+ puerto +'/api/TU/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1="+ a+ "&TU_2="+b+
	"&TU_3="+ c
      }
	  )
  .then(function(response) {
		return response.text().then(function(res) {
				console.log("Resultado: "+res);
					if(res.indexOf("error")==-1){
						$("#mensaje").text("Acción realizada con éxito");
			}
				});
	})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
 
  }
  function validar(){ //Valiad los campos de entrada
	I2 = true;
	I3 = true;
	I4 = true;
	I5 = true;
	I6= true;

	if($("#IU1").val().length == 0){
		$("#div1").attr('class','form-group has-error') ;
		$("#IU1").attr('title','Campo Obligatorio') ;
		I2 = false;
	}
	else{
	  cambioClase1(1);
	$("#IU1").attr('title','');
	}
	if($("#IU2").val().length == 0){
		$("#div2").attr('class','form-group has-error') ;
		$("#IU2").attr('title','Campo Obligatorio') ;
		I3 = false;
	}
	else{
	 cambioClase1(2);
	$("#IU2").attr('title','');
	}
	if($("#IU3").val().length == 0){
		$("#div3").attr('class','form-group has-error') ;
		$("#IU3").attr('title','Campo Obligatorio') ;
		I4 = false;
	}
	else{
	 cambioClase1(3);
	$("#IU3").attr('title','');
	}
	if($("#IU4").val().length == 0){
		$("#div4").attr('class','form-group has-error') ;
		$("#IU4").attr('title','Campo Obligatorio') ;
		I5 = false;
	}
	else{
	 cambioClase1(4);
	$("#IU4").attr('title','');
	}
	if($( "#IU4" ).prop("disabled")!=true){ 
	if($("#IU5").val().length == 0){
		$("#div5").attr('class','form-group has-error') ;
		$("#IU5").attr('title','Campo Obligatorio') ;
		I6 = false;
	}
	else{
	 cambioClase1(5);
	$("#IU5").attr('title','');
	}
	}
	if($("#IU4").val()!=$("#IU5").val() && $( "#IU4" ).prop("disabled")!=true){
		$("#div4").attr('class','form-group has-error') ;
		$("#IU4").attr('title','La contraseña no coincide') ;
		$("#div5").attr('class','form-group has-error') ;
		$("#IU5").attr('title','La contraseña no coincide') ;
		$("#IU5").val("");
		$("#IU4").val("");
		I6 = false;
	}
	else{
	if(I6&&I5){
	 cambioClase1(4);
	$("#IU4").attr('title','');
	 cambioClase1(5);
	$("#IU5").attr('title','');
	}
	}

		return (I2  && I3  && I4 && I5 && I6 );	
}


function limpiarValores(){ //Limpia los valores de los campos de entrada
    $("#div5").attr('class','form-group') ;
	$("#IU5").attr('title','');
	$("#IU5").val("");
	let i =1;
	for(i=1;i<6;i++){
	   cambioClase1(i);
	}
}
  
  function cambioClase1(op){ //Realiza el cambio de clase de has-error a form-group
	switch(op){
		case 1:  $("#div1").attr('class','form-group'); break;
		case 2:	 $("#div2").attr('class','form-group'); break;
		case 3:  $("#div3").attr('class','form-group'); break;
		case 4:  $("#div4").attr('class','form-group'); break;
		case 5:  $("#div5").attr('class','form-group'); break;
	}
  }
  
  function activar(){//Tiene la función del botón cambiar contraseña para habilitarlo
    $("#IU4").removeAttr("disabled");
    $("#LIU5").show();
    $("#IU5").show();	
    $("#btnCambiar").hide();
  }
  
  function desactivar(){ //Tiene la función del botón cambiar contraseña para deshabilitarlo 
    $("#IU4").attr('disabled','disabled');
    $("#LIU5").hide();
    $("#IU5").hide();
	$("#btnCambiar").show();
  }
 
 function asignarUsuario($scope, cor)//Busca en la tabla de usuarios y en la de personas  
							//al usuario q se va a editar  y lo cargar
 {	desactivar();
   limpiarValores();
   console.log("entran  asigna");
	 fetch( 'http://' + ip + ':'+ puerto +'/api/TPTU/B', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1=" + cor.tp_4
      }
	)	 
	.then(res => res.json())
	.then(obj => cargarDatos(obj.data[0])
			)
	.catch(err => console.log('Request failed', err));
 }
 
  function asignarUsuario2($scope, cor)//Muestra la información del usuario que se va 
									//a eliminar en el mensaje de confirmación
 {	
 $("#labelEliminar").text(cor.tp_4+" ");
 $("#labelEliminar2").text(cor.tp_1+" ");
 $("#labelEliminar3").text(cor.tp_2+" ");
 $("#labelEliminar4").text(cor.tp_3+"?");
 }
  function cargarDatos(data){ //Muestra los datos del usuario a la hora de editar en pantalla
  console.log(data);
     $("#IU1").val(data.tp_1);
     $("#IU2").val(data.tp_2);
     $("#IU3").val(data.tp_3);
	 $("#IU0").val(data.tu_1);
	 $("#IU4").val(data.tu_2);
	 if(data.tu_3 == 1)
		$("#administrador_checkbox").prop("checked", "checked");
	 
	 else
		$("#administrador_checkbox").prop("checked", "");

 }
 
 function busquedaUsuario($scope)  //Metodo de Busqueda
 {
 console.log("Retornado de url > " + tipoBusqueda($scope));
	let h3 = document.getElementById('buscar').value;
	
	 fetch( 'http://' + ip + ':'+ puerto +'/api/TP/'+tipoBusqueda($scope), {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: tipoBusquedaBD($scope) + "=" + h3
      }
	)	 
	.then(res => res.json())
	.then(obj => $scope.$apply( _=>
					$scope.updateUsuarios(obj.data)))
	.catch(err => console.log('Request failed', err));
}
 
 
function tipoBusqueda($scope)// Toma el tipo de busqueda y regresa el sufijo correspondiente a la dirección del servidor
{
	let op = $scope.criterio;
	console.log("El tipo de busqueda es por: |" + op + "|");
	switch(op)
	{
		case 'identificacion': // Identicacion
			return 'B';
		case 'nombre': // Nombre
			return 'BN';
		case 'apellido1': // Primer apellido
			return 'BA1';
		case 'apellido2': // Segundo Apellido
			return 'BA2';
	}
}  
function tipoBusquedaBD($scope) //Toma el criterio de busqueda y devuelve la columna que se debe buscar en la BD
{
	let op = $scope.criterio;
	switch(op)
	{
		case 'identificacion': // Identicacion
			return 'TP_4';
		case 'nombre': // Nombre
			return 'TP_1';
		case 'apellido1': // Primer Apellido
			return 'TP_2';
		case 'apellido2': // Segundo Apellido
			return 'TP_3';
	}
	
} 

function limpiaDivMensaje($scope){// limpia el div con el id de buscar
	document.getElementById('buscar').value="";
	$scope.usuarios = new Array();
	} 
	
	
	
 function eliminarUsuarios($scope, cor) { //Elimina los usuarios de la base de datos
 
 eliminaTU($scope,cor);
 eliminaTP($scope,cor);
 busquedaUsuario($scope);
 busquedaUsuario($scope); 
 busquedaUsuario($scope);
 $('#myModal2').modal('hide'); // NUEVO
 }
 
 	function eliminaTU($scope, cor){ //Elimina un usuario de la tabla de usuarios en la base de datos
	let d = $("#labelEliminar").text();//$('#IU4').val();
	console.log("valor de D "+d);
	return fetch('http://' + ip + ':'+ puerto +'/api/TU/D?TU_1=' + d, {  
     method: 'get', 
     mode:'no-cors',
     datatype:'html',
     headers: {  
      "Content-type": "text/html"
    }  
  })
		 .then(res => res.json())
     	 .then(json => (console.log(json),$scope.buscar()))		//.then(obj =>console.log("Objeto",obj))  //Columna especifica obj.data[0].tp_1 // Nota: para pasar a JSON se usa JSON.stringify(obj.data[0].tp_1)

		.catch(err => console.log('Request failed', err));
	}
	
		function eliminaTP($scope, cor){
	let d = $("#labelEliminar").text();//$('#IU4').val();
	console.log(d);
	return fetch('http://' + ip + ':'+ puerto +'/api/TP/D?TP_4=' + d, {  
     method: 'get', 
     mode:'no-cors',
     datatype:'html',
     headers: {  
      "Content-type": "text/html"
    }  
  })
		 .then(res => res.json())
     	 .then(json => console.log(json))
		.catch(err => console.log('Request failed', err));
	}
	