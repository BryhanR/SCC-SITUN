
function iniciar_B($scope){
	if(localStorage.getItem('corres_B')!=null){		
		// Seleccionamos el tipo de busqueda por numero de oficio
		var $miSelect = $('#opBusqueda');
        $miSelect.val($miSelect.children('option:first').val());
		$scope.criterio = "Nº oficio";		
		$("#buscar").val(localStorage.getItem('corres_B')); 		
		localStorage.removeItem('corres_B'); // Eliminamos el elemento del localStorage
		busquedaCorrespondencia($scope);
	}	
}


function dato_Adjunto(){ //
	adj = $('#adjun').prop('files');
	$('#input_adjunto').val(adj[0].name);
}


function abrirBusqueda(en,$scope){
localStorage.setItem('corres_B',en);
window.open('http://' + ip +':'+ puerto +'/HTML/Busqueda','_self');
}



function controllerAngular($scope)//ControllerAngular
{
	$scope.criterio = "Asunto";
	$scope.correspondencias = new Array();
	$scope.updateCorrespondencias = c => ($scope.correspondencias =c,$scope.totalItems=$scope.correspondencias.length);
	$scope.buscar = _ => busquedaCorrespondencia($scope);
	$scope.clear = _ => limpiaTabla($scope);	 
	$scope.AsignaUrl = r => UrlAdj($scope,r);
	$scope.obtenerEnlaces	= n => buscaEnlaces($scope, n);
	$scope.enlaces = new Array();
    $scope.obtenerInformacion	= e => asignarInformacion($scope, e);
	$scope.recibido = r => ObtenerRecibido();
	$scope.actualiza =_ => actualizarInfo($scope);
	$scope.Alarma= x => ajusteAlarma($scope,x);
	$scope.nuevaAlarma = h => nuevaAlarma($scope, h);
	$scope.busquedaEnlacesSeleccionados = en  => abrirBusqueda(en,$scope);
	$scope.ini_Busqueda = _ => iniciar_B($scope);


//-----------------------------
	$scope.totalItems = 0;
  	$scope.currentPage = 1;
  	$scope.pageSize = 10;
  	$scope.paginationSize = 5;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
    console.log('total Items: ' + $scope.totalItems);
  };
}
 
 
 function buscaEnlaces($scope, cor) //Muestra todos los enlaces relacionados con una correspondencia especifica
 {	
	fetch( 'http://' + ip + ':'+ puerto +'/api/ALL/ENLACES', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      	"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body: "COD=" + cor.tc_1
    })	 
	.then(res => res.json())
	.then(obj => ( $scope.$apply( _=>
		$scope.enlaces = obj.data),
		$("#idEnlace").text(cor.tc_3) 
		)
	)
	.catch(err => console.log('Request failed', err));
 }
 
 
var conditional;
function asignarInformacion($scope, cor){ //Busca la correspondencia y muestra la informacion de esta
	fetch( 'http://' + ip + ':'+ puerto +'/api/TC/BC', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body: "TC_1=" + cor.tc_1
    })	 
	.then(res => res.json())
	.then(obj => cargarDatos( obj.data[0]) )
	.catch(err => console.log('Request failed', err));
}
 

function existeUrl(url) { // Verifica que exista el archivo adjunto mediante el url del archivo
   var http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send();
   return http.status!=404;
}
 
function UrlAdj($scope, cor){
	
	var cst=0;
	$scope.url='http://' + ip + ':'+ puerto +'/Adjunto/'+cor.tc_12;
	if(existeUrl($scope.url) && cor.tc_12 != null && cor.tc_12.length != 0)
		$("#abrirDoc").removeAttr("disabled");
	else{
		$('#abrirDoc').attr('disabled', 'disabled');
		$scope.url='';
	}
	$('#input_adjunto').val(cor.tc_12);
	$("#btnGda").click(function(){
		if(cst == 0){
			actualizarAdj(cor.tc_1,cor.tc_12);
	  		cst++;  
			$("[data-dismiss=modal]").trigger({ type: "click" });
	  		busquedaCorrespondencia($scope)
		}
	});
}


function actualizarAdj(cor,cor2){ //Actualiza la informacion que se haya editado
	 
  	let doc = $('#input_adjunto').val();
  	fetch( 'http://' + ip + ':'+ puerto +'/api/TC/UDA', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded",
      	} ,
    	body: "TC_1="+cor+ "&TC_12="+doc
    })
  	.then(function(response) {  
		if(doc != '' && doc != cor2){ 
			var formData  = new FormData();		
			formData.append('arc', adj[0]);
			fetch('http://' + ip + ':'+ puerto +'/upload', {
    			method: 'POST',
    			body: formData
  			});
		}
		else
			$("#mensaje").text("Fallo al realizar la acción"); 
  	});
	cor = null; 
}
  
 

 
 let person;
 let condicion;
  
function cargarDatos( data){ //Muestra los datos de la correspondencia en pantalla
	condicion = data.tc_1;
	let fechaO =  new Date(data.tc_2.substr(0, 4),data.tc_2.substr(5, 2),data.tc_2.substr(8, 2));
	let fechaOficio = (data.tc_2.substr(8, 2)+"-"+data.tc_2.substr(5, 2)+"-"+data.tc_2.substr(0, 4));
    $("#IC1").val(fechaOficio);
    $("#IC2").val(data.tc_3);
	let fechaR =  new Date(data.tc_4.substr(0, 4),data.tc_4.substr(5, 2),data.tc_4.substr(8, 2));
	let fechaRecibido = (data.tc_4.substr(8, 2)+"-"+data.tc_4.substr(5, 2)+"-"+data.tc_4.substr(0, 4));
    $("#IC3").val(fechaRecibido);
	$("#IC4").val(data.tc_5);
	$("#IC5").val(data.tc_6);
	$("#IC6").val(data.tc_7);
    $("#IC7").val(data.tc_8);
	person = data.tc_9;
    ObtenerRecibido();
	$("#IC9").val(data.tc_10);
	$("#IC10").val(data.tc_11);
}
 
 
function ObtenerRecibido() //busca el nombre de la persona que recibio la correpondencia
{								//y lo cambia por el id de la persona
	fetch( 'http://' + ip + ':'+ puerto +'/api/TP/B', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body: "TP_4=" + person
    })	 
	.then(res => res.json())
	.then(obj => cargarRecibido(obj.data[0],true) )
	.catch(err => console.log('Request failed', err));
}

function cargarRecibido(data,op){ //Carga la información de la persona que en el input IC8 o retorna la persona
	if(op)
      $("#IC8").val(data.tp_1+" "+data.tp_2+" "+data.tp_3);
	else
	  return data.tp_4;
}
 
function busquedaCorrespondencia($scope)  //Metodo de Busqueda
{ 
	let h3 = document.getElementById('buscar').value;
	fetch( 'http://' + ip + ':'+ puerto +'/api/TC/' + tipoBusqueda($scope), {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body: tipoBusquedaBD($scope) + "=" + h3
    })	 
	.then(res => res.json())
	.then(obj =>{
		$scope.$apply( _=>
		$scope.updateCorrespondencias(obj.data));})
		.catch(err => console.log('Request failed', err));
}
 
 
function tipoBusqueda($scope)// Toma el tipo de busqueda y regresa el sufijo correspondiente a la dirección del servidor
{
	let op = $scope.criterio;
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

function limpiaTabla($scope){// limpia el div con el id de buscar
	$("#buscar").val("");
	$scope.correspondencias = new Array();
} 

function limpiaDivMensaje(){//Limpia el div con el id=mensaje
	$("#mensaje").text("");
}

function actualizarInfo($scope){ //Actualiza la informacion que se haya editado
	actualizarCorrespondencia($scope);
    busquedaCorrespondencia($scope);
	$("[data-dismiss=modal]").trigger({ type: "click" });
}

function checkCampoOficio(){ //Cambia el valor del campo referente al numero de oficio si la opcion SIN OFICIO esta marcada
	if($("#IC12").is(':checked')){
		$("#IC2").val("SIN OFICIO");
		$("#IC2").prop("disabled",true);	
	}else{
		$("#IC2").val("");
		$("#IC2").prop("disabled",false);
	}
}

function checkCampoCopia(){ //Cambia el valor del campo COPIA por la opción SIN COPIA
	if($("#check_SinCopia").is(':checked')){
		$("#IC5").val("SIN COPIA");
		$('#IC5').focus();
		$("#IC5").prop("disabled",true);	
	}else{
		$("#IC5").val("");	
		$("#IC5").prop("disabled",false);
		$('#IC5').focus();
	}
}

var validator;
var validatorAlarma;
function limpiarCampos(){//Limpia el valor de los campos de entrada de los formularios y resetea los validadores
	$("#FormularioCorrespondencia")[0].reset();
	validator.submitted = {};
	validator.elements().tooltipster('hide');
	$("#FormularioAlarma")[0].reset();
	validatorAlarma.submitted = {};
	validatorAlarma.elements().tooltipster('hide');
}



function actualizarCorrespondencia($scope,cor){ //Recoge los datos de los campos y realiza el fecth de inserción 
	var d = new Date($("#IC1").val());
	let a1 = condicion;
	let b3 = $("#IC1").val().substr(6,4)+"-"+$("#IC1").val().substr(3,2)+"-"+$("#IC1").val().substr(0,2);
	let c3 = $('#IC2').val().toUpperCase(); 
	let fecha = $('#IC3').val();
	let d3 = $("#IC3").val().substr(6,4)+"-"+$("#IC3").val().substr(3,2)+"-"+$("#IC3").val().substr(0,2);
	let e3 = $('#IC4').val().toUpperCase();
	let f3 = $('#IC5').val().toUpperCase();
	let g3 = $('#IC6').val().toUpperCase();
	let h3 = $('#IC7').val().toUpperCase();
	let i3 = person; 
	let j3 = $('#IC9').val().toUpperCase();
    let k3 = $('#IC10').val().toUpperCase();
	fetch( 'http://' + ip + ':'+ puerto +'/api/TC/UD', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body: "TC_1="+ a1+"&TC_2="+ b3+ "&TC_3="+c3+
			"&TC_4="+ d3 + "&TC_5="+ e3 +"&TC_6="+ f3 + 
			"&TC_7="+ g3 + "&TC_8="+ h3 +"&TC_9="+ i3+"&TC_10="+ j3+ "&TC_11="+ k3
    })
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

function ajusteAlarma($scope ,cor)  //Inicia el proceso para crear o insertar la alarma
{   
 	let corr = cor.tc_1;
 	console.log("Retornado de url > " + "Alarmas");
	console.log( cor.tc_1);
	fetch( 'http://' + ip + ':'+ puerto +'/api/TA/ALL_TA', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body:  "TA_1=" + cor.tc_1
    })	 
    .then(res => res.json())
	.then(obj => cargaAlarma(obj.data[0],corr))
	.catch(err => console.log('Request failed', err));
}
 
var tmp;
var tmp1;
function cargaAlarma(data,corr){ //carga los datos de la alarma para mostrar en pantalla  
	tmp = corr;

   if(data!=null){
		 $("#divAjuste1").hide();
      $("#IC17").val(data.ta_2.substr(8,2)+"-"+data.ta_2.substr(5,2)+"-"+data.ta_2.substr(0,4));
	  $("#IC16").val(data.ta_3.substr(8,2)+"-"+data.ta_3.substr(5,2)+"-"+data.ta_3.substr(0,4));
	  tmp1 = corr;
	   $("#myModal4").modal("show");
	 /* $("#btnGd1").click(function(){
		console.log("guarde2");
		actualizarAlarma(corr);
		$("[data-dismiss=modal]").trigger({ type: "click" });
		}//fin function
		);
		*/
	 return 0; }

	  else{
		  $("#divAjuste1").show();
		$("#IC17").val("");
	    $("#IC16").val("");
	  	tmp1 = null;
	   	$("#myModal4").modal("show");
	   	return 1;
	}
 }

 function actualizarAlarma(data){ //Recoge los datos de los campos y realiza el fecth de actualizacion de alarma
	let d3 = $("#IC16").val().substr(6,4)+"-"+$("#IC16").val().substr(3,2)+"-"+$("#IC16").val().substr(0,2);
	let b3 = $("#IC17").val().substr(6,4)+"-"+$("#IC17").val().substr(3,2)+"-"+$("#IC17").val().substr(0,2);

	fetch( 'http://' + ip + ':'+ puerto +'/api/TA/UDF', {  
    	method: 'POST', 
    	datatype:'json',
    	headers: {  
      		"Content-type": "application/x-www-form-urlencoded"  
      	} ,
    	body: "TA_1="+ data+"&TA_2="+ b3+"&TA_3="+ d3+"&TA_4=0"
      })
  	.then()
  	.catch(function(error) {  
   		console.log('Request failed', error);  
  	});
 	$("[data-dismiss=modal]").trigger({ type: "click" });
}

function nuevaAlarma(data){//Insercion de una nueva alarma a las correpondencia escogida
	let b5 = $("#IC16").val().substr(6,4)+"-"+$("#IC16").val().substr(3,2)+"-"+$("#IC16").val().substr(0,2);	
	let c5 = $("#IC17").val().substr(6,4)+"-"+$("#IC17").val().substr(3,2)+"-"+$("#IC17").val().substr(0,2);
	let d5 = 0;
	if(b5 != "" && c5 != ""){ 
		fetch( 'http://' + ip + ':'+ puerto +'/api/TA/I', {  
			method: 'POST', 
			datatype:'json',
			headers: {  
				"Content-type": "application/x-www-form-urlencoded"  
			} ,
			body: "TA_1="+ data+ "&TA_2="+ c5+ "&TA_3="+b5+"&TA_4="+ d5 
		})
		.then(function(response) {
			return response.text().then(function(res) {
				console.log("Resultado de nueva alarma: "+res);
			});
		})
		.catch(function(error) {  
			console.log('Request failed', error);  
		});
	}
}
	
	
	

