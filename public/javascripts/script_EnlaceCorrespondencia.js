let obj="";
  let banderita;
function recuperarCorrespondenciaLS(){  //metodo para recuperar el id de la correspondencia guardado en el local storage

	$("#E3").hide();
	$("#E4").hide();

	 obj  = JSON.parse(localStorage.getItem("user"));
	 console.log("Objeto cargado de local.." + localStorage.getItem("user"));
	  banderita = obj.bandera;
	  if ( banderita==true){
	  $("#E2").val(obj.numOficio);
	  $("#E2").prop("disabled", true );	  
	  }

	  localStorage.removeItem('user');
}





function controllerAngular($scope)//ControllerAngular
 {
	$scope.correspondencias = new Array();
	$scope.doc1 = {'tc_3': ""};
	$scope.doc2;
	$scope.current;
	$scope.criterio = "Asunto";	
	$scope.init = _ => console.log("Se ha iniciado el sistema...");
	$scope.setCurrent = c => $scope.current = c;
	$scope.updateDoc = a => modificaCampos(a, $scope);//$scope.current == 1? ($scope.doc1 = a, deshabilitar('E1')): ($scope.doc2 = a, deshabilitar('E2'));
	
	$scope.updateCorrespondencias = c => $scope.correspondencias = c;
	$scope.buscar = (a,b) => busqueda(a,$scope,b);
	$scope.enlazar = _ => crearEnlace($scope);
	
	$scope.editar = d => botonEditar(d, $scope);
		
  }
  
  
  
	function modificaCampos(a, $scope)//Modifica los campos E1 o E2
	{
		$scope.current == 1? ($scope.doc1 =  a, $("#E3").show() ): ($scope.doc2 = a , $("#E4").show());
		let id = ($scope.current == 1)? "E1" : "E2";
		$("#" + id ).attr("value",a.tc_3);
		$("#" + id ).prop('disabled', true);
	}
	
	function botonEditar(d, $scope)//Edita los campos de entrada
	{
		(d == "E1") ? ($scope.doc1 = null, $("#E3").hide()) : ($scope.doc2 = null, $("#E4").hide());
		$("#"+d).prop('disabled', false);
		$("#mensaje").html('');
	}
  
/*
 *	Realiza la busqueda en la base de datos de los elementos que coinciden
 *	parcialmente con el criterio, ya sea para el documento 1 o el 2 
 */
	function busqueda(id, $scope,h) //Metodo de buscar
	{
		let keycode = (h.which)?h.which : h.keyCode;
		
		let h3 = $("#" + id ).val();
		let criterio = ((keycode != 8)?(h3 + String.fromCharCode(keycode)) : h3.substr(0,h3.length-1)).toUpperCase();

	
		fetch( 'http://' + ip + ':'+ puerto +'/api/TC/' + tipoBusqueda($scope), {  
			method: 'POST', 
			datatype:'json',
			headers: {  
				"Content-type": "application/x-www-form-urlencoded"  
			} ,
			body: tipoBusquedaBD($scope) + "="+ criterio
		})	 
		.then(res => res.json())
		.then(obj =>  
				$scope.$apply( _=>
					$scope.updateCorrespondencias(obj.data)) 
		)  
		.catch(err => console.log('Request failed', err));
	}
	
	
	function tipoBusqueda($scope)// Toma el tipo de busqueda y regresa el sufijo correspondiente a la dirección del servidor
{
	let op = $scope.criterio;
	console.log("El tipo de busqueda es por: |" + op + "|");
	switch(op)
	{
		case 'Nº oficio': // Oficio
			return 'BO';
		case 'Destinatorio': // Destinatario
			return 'BD';
		case 'Remitente': // Remitente
			return 'BR';
		case 'Asunto': // Asunto
			return 'BA';
	}
}  
function tipoBusquedaBD($scope) //Toma el criterio de busqueda y devuelve la columna que se debe buscar en la BD
{
	let op = $scope.criterio;
	switch(op)
	{
		case 'Nº oficio': // Oficio
			return 'TC_3';
		case 'Destinatorio': // Destinatario
			return 'TC_5';
		case 'Remitente': // Remitente
			return 'TC_7';
		case 'Asunto': // Asunto
			return 'TC_8';
	}
	
} 
	
	
 
 /*
  *		Realiza el enlace de los documentos seleccionados
  */
  
	function crearEnlace($scope){//Crea el enlace entre documentos
	  let a4;
	  let b4;
	  if(banderita == true){
		a4 = obj.id;
		b4 = $scope.doc1.tc_1;
		localStorage.clear();
		}
		else{
		a4= $scope.doc1.tc_1;
		b4 = $scope.doc2.tc_1;}
		
		console.log(a4 , b4);
		if(a4==b4){
		$("#mensaje").html('Fallo al realizar la acción, el documento a enlazar es el mismo');
		
		}
		else{
		fetch( 'http://' + ip + ':'+ puerto +'/api/TE/I', {  
			method: 'POST', 
			datatype:'json',
			headers: {  
				"Content-type": "application/x-www-form-urlencoded"  
			} ,
			body: "TE_1="+ a4 + "&TE_2="+ b4
		}
		)
		.then(function(response) {
			return response.text().then(function(res) {
					if(res.indexOf("error")==-1){
						console.log(res);
						$("#mensaje").html('Acción realizada con éxito');
						setTimeout(limpiaCampos, 2000);
					}
					else
						$("#mensaje").html('Fallo al realizar la acción');
			});
		})
		.catch(function(error) {  
			console.log('Request failed', error);  
		});
		}
  }
  
  function limpiaCampos(){//Limpia los campos , Metodo Cancelar
	$("#E1").val("");
	$("#E2").val("");
	$("#E1").prop("disabled",false);
	$("#E2").prop("disabled",false);
	$("#mensaje").html('');
	$("#E3").hide();
	$("#E4").hide();
  
	if(banderita == true)
	{
		localStorage.clear();
		window.location.href ='http://' + ip + ':'+ puerto +'/HTML/Ingreso%20de%20Correspondencia'
	}
  }