function controllerAngular($scope)//ControllerAngular
 {
	$scope.criterio = "Asunto";
	$scope.correspondencias = new Array();
	$scope.updateCorrespondencias = c => $scope.correspondencias = c;
	$scope.buscar = _ => busquedaCorrespondencia($scope);
	$scope.clear = _ => limpiaTabla($scope);
	$scope.obtenerEnlaces	= n => buscaEnlaces($scope, n);
	$scope.enlaces = new Array();
    $scope.obtenerInformacion	= e => asignarInformacion($scope, e);
	$scope.recibido = r => ObtenerRecibido();
	$scope.actualiza =_ => actualizarInfo($scope);
	$scope.Alarma= x => ajusteAlarma($scope,x);
	$scope.nuevaAlarma = h => nuevaAlarma($scope, h);
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
      }
	)	 
	.then(res => res.json())
	.then(obj => ( $scope.$apply( _=>
						$scope.enlaces = obj.data),
					$("#idEnlace").text(cor.tc_3) 
				)
			)
	.catch(err => console.log('Request failed', err));
 }
 
 
 let conditional;
  function asignarInformacion($scope, cor){ //Busca la correspondencia y muestra la informacion de esta
   conditional=cor.tc_1;
   console.log("asigna"+cor.tc_1);
	 fetch( 'http://' + ip + ':'+ puerto +'/api/TC/BC', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TC_1=" + cor.tc_1
      }
	)	 
	.then(res => res.json())
	.then(obj => cargarDatos( obj.data[0])
			)
	.catch(err => console.log('Request failed', err));
 }
 
 let person;
 let condicion;
  
  function cargarDatos( data){ //Muestra los datos de la correspondencia en pantalla
	condicion=data.tc_1;
	let fechaO=  new Date(data.tc_2.substr(0, 4),data.tc_2.substr(5, 2),data.tc_2.substr(8, 2));
	let fechaOficio=(data.tc_2.substr(8, 2)+"-"+data.tc_2.substr(5, 2)+"-"+data.tc_2.substr(0, 4));
    $("#IC1").val(fechaOficio);
    $("#IC2").val(data.tc_3);
	let fechaR=  new Date(data.tc_4.substr(0, 4),data.tc_4.substr(5, 2),data.tc_4.substr(8, 2));
	let fechaRecibido=(data.tc_4.substr(8, 2)+"-"+data.tc_4.substr(5, 2)+"-"+data.tc_4.substr(0, 4));
     $("#IC3").val(fechaRecibido);
	 $("#IC4").val(data.tc_5);
	 $("#IC5").val(data.tc_6);
	 $("#IC6").val(data.tc_7);
     $("#IC7").val(data.tc_8);
	 person=data.tc_9;
     ObtenerRecibido();
	 $("#IC9").val(data.tc_10);
	 $("#IC10").val(data.tc_11);
 }
 
 
 function ObtenerRecibido() //busca el nombre de la persona que recibio la correpondencia
{								//y lo cambia por el id de la persona
 	
    console.log("Person"+person);
	fetch( 'http://' + ip + ':'+ puerto +'/api/TP/B', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_4=" + person
      }
	)	 
	.then(res => res.json())
	.then(obj => cargarRecibido(obj.data[0],true)
			)
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
 	console.log("Retornado de url > " + tipoBusqueda($scope));
	let h3 = document.getElementById('buscar').value;
	 fetch( 'http://' + ip + ':'+ puerto +'/api/TC/'+tipoBusqueda($scope), {  
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
					$scope.updateCorrespondencias(obj.data)))
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

function limpiaTabla($scope){// limpia el div con el id de buscar
	$("#buscar").val("");
	$scope.correspondencias = new Array();
	} 

 function limpiaCamposEnfocados(n){//Limpia los campos cuando se enfocan
  limpiaDivMensaje();
  cambioClase1(n);
 }
 
 function limpiaDivMensaje(){//Limpia el div con el id=mensaje
$("#mensaje").text("");
}

function cambioClase1(op){//Realiza un cambio de clase a los campos de entrada del formulario de la clase has-error a from-group
	switch(op){
	case 1: document.getElementById("datetimepicker55").className= "input-append form-group";break;
	case 2: document.getElementById("div2").className ="form-group" ; break;
	case 3: document.getElementById("datetimepicker66").className ="input-append  form-group" ; break;
	case 4: document.getElementById("div4").className ="  form-group" ;break;
	case 5: document.getElementById("div5").className ="  form-group" ;break;
	case 6: document.getElementById("div6").className ="  form-group" ;break;
	case 7: document.getElementById("div7").className ="  form-group" ;break;
	case 8: document.getElementById("div8").className ="  form-group" ;break;
	case 9: document.getElementById("div9").className ="  form-group" ;break;
	default: break;
	}
	}
	
function actualizarInfo($scope){ //Actualiza la informacion que se haya editado
    if(validar()){
	actualizarCorrespondencia($scope);
    busquedaCorrespondencia($scope);
	$("[data-dismiss=modal]").trigger({ type: "click" });
	}
  }
  
  function checkCampoOficio(){ //Cambia el valor del campo referente al numero de oficio si la opcion SIN OFICIO esta marcada
if($("#IC12").is(':checked')){
	$("#IC2").val("SIN OFICIO");
	$("#IC2").prop("disabled",true);	
	}
	else{
	$("#IC2").val("");
	$("#IC2").prop("disabled",false);
	}
}

function validaFechas(){   //validacion de fechas editadas
	let fechaR=$("#IC1").val();
	let s=new Date(fechaR.substring(10, 6)+'-'+fechaR.substring(5, 3)+'-'+fechaR.substring(2, 0));
	let fecha2=$("#IC3").val();
	let r=new Date(fecha2.substring(10, 6)+'-'+fecha2.substring(5, 3)+'-'+fecha2.substring(2, 0));
	 if(s<r)
	 return -1;
	 else if(s>=r)
	 return 1;

}
  function validaFechasAlarma(){   //validacion de fechas de ajuste de alarmas
	let fechaR=$("#IC14").val();
	let s=new Date(fechaR.substring(10, 6)+'-'+fechaR.substring(5, 3)+'-'+fechaR.substring(2, 0));
	let fecha2=$("#IC15").val();
	let r=new Date(fecha2.substring(10, 6)+'-'+fecha2.substring(5, 3)+'-'+fecha2.substring(2, 0));
	 if(s<r)
	 return -1;
	 else if(s>=r)
	 return 1;
}
  
  function validar(){	 //Valida los campos 
	IC1 = true;
	IC2 = true;
	IC3 = true;
	IC4	= true;
	IC5 = true;
	IC6 = true;
	IC7 = true;
	IC8 = true;
	IC9 = true;
	IC10 = true;
	
	if($("#IC1").val().length == 0 || validaFechas()==-1){
		document.getElementById("datetimepicker55").className ="input-append  form-group has-error" ;
		document.getElementById("IC1").title = "Campo Obligatoria" ;
		IC1 = false;
	}
	else{
	document.getElementById("datetimepicker55").className ="input-append  form-group" ;
	document.getElementById("IC1").title = "" ;
	}
	if($("#IC2").val().length == 0){
		document.getElementById("div2").className = "form-group has-error" ;
		document.getElementById("IC2").title = "Campo Obligatorio";
		IC2 = false;
	}
	else{
	document.getElementById("div2").className ="  form-group" ;
	document.getElementById("IC2").title = "" ;
	}
	
	if($("#IC3").val().length == 0 || validaFechas()==-1){
		document.getElementById("datetimepicker66").className = " input-append  form-group has-error" ;
		document.getElementById("IC3").title = "Campo Obligatorio";
		IC3 = false;
	}
	else{
	document.getElementById("datetimepicker66").className ="input-append  form-group" ;
	document.getElementById("IC3").title = "" ;
	}
	if($("#IC4").val().length == 0){
		document.getElementById("div4").className ="form-group has-error" ;
		document.getElementById("IC4").title = "Campo Obligatorio";
		IC4 = false;
	}
	else{
	document.getElementById("div4").className =" form-group" ;
	document.getElementById("IC4").title = "" ;
	}
	if($("#IC5").val().length == 0){
		document.getElementById("div5").className = "form-group has-error" ;
		document.getElementById("IC5").title = "Campo Obligatorio";
		IC5 = false;
	}
	else{
	document.getElementById("div5").className ="  form-group" ;
	document.getElementById("IC5").title = "" ;
	}
	if($("#IC6").val().length == 0){
		document.getElementById("div6").className = "form-group has-error" ;
		document.getElementById("IC6").title = "Campo Obligatorio";
		IC6 = false;
	}
	else{
	document.getElementById("div6").className ="  form-group" ;
	document.getElementById("IC6").title = "" ;
	}
	if($("#IC7").val().length == 0){
		document.getElementById("div7").className = "form-group has-error" ;
		document.getElementById("IC7").title = "Campo Obligatorio";
		IC7 = false;
	}
	else{
	document.getElementById("div7").className ="form-group" ;
	document.getElementById("IC7").title = "" ;
	}
	if($("#IC8").val().length == 0){
		document.getElementById("div8").className = "form-group has-error" ;
		document.getElementById("IC8").title = "Campo Obligatorio";
		IC8 = false;
	}
	else{
	document.getElementById("div8").className ="  form-group" ;
	document.getElementById("IC8").title = "" ;
	}
	if($("#IC9").val().length == 0){
		document.getElementById("div9").className ="form-group has-error" ;
		document.getElementById("IC9").title = "Campo Obligatorio";
		IC9 = false;
	}
	else{
	document.getElementById("div9").className ="  form-group" ;
	document.getElementById("IC9").title = "" ;
	}
		return (IC1 && IC2  && IC3  && IC4 	&& IC5 && IC6 && IC7 && IC8 && IC9 && cambioClase2());
	
}

function cambioClase2(){//Realiza el cambio de clase de los campon de fecha del formulario a la clase has-error
	//La fecha debe de llevar el formato YYYY/MM/dd
	var d=new Date($("#IC1").val());
	let fecha1 = d.getFullYear() + '-'+(d.getMonth()+1) + '-' + ((d.getDate()<10)?'0':'') + d.getDate();
	let fecha2=$("#IC3").val();
	let r=fecha2.substring(10, 6)+'-'+fecha2.substring(5, 3)+'-'+fecha2.substring(2, 0);
	if(fecha1>=r){
	document.getElementById("datetimepicker55").className ="input-append  form-group " ;
	document.getElementById("IC1").title = "" ;
	document.getElementById("datetimepicker66").className ="input-append  form-group " ;
	document.getElementById("IC3").title = "" ;
	return true;}
	else{
	document.getElementById("datetimepicker55").className ="input-append  form-group has-error" ;
	document.getElementById("IC1").title = "Fecha de oficio mayor a la de recibido" ;
	document.getElementById("datetimepicker66").className ="input-append  form-group has-error" ;
	document.getElementById("IC3").title = "Fecha de oficio mayor a la de recibido" ;
	return false;}
	}
	
function actualizarCorrespondencia($scope,cor){ //Recoge los datos de los campos y realiza el fecth de inserción 
	var d=new Date($("#IC1").val());
	let a1=conditional;
	let b3 = $("#IC1").val().substr(6,4)+"-"+$("#IC1").val().substr(3,2)+"-"+$("#IC1").val().substr(0,2);
	console.log("anooo "+b3);
	let c3 = $('#IC2').val().toUpperCase(); 
	let fecha=$('#IC3').val();
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

function ajusteAlarma($scope ,cor)  //Metodo de ajuste de alarma
 {   let corr=cor.tc_1;
 	console.log("Retornado de url > " + "Alarmas");
	console.log( cor.tc_1);
	fetch( 'http://' + ip + ':'+ puerto +'/api/TA/ALL_TA', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body:  "TA_1=" + cor.tc_1
      }
	)	 
    .then(res => res.json())
	.then(obj => cargaAlarma(obj.data[0],corr))
	.catch(err => console.log('Request failed', err));
 }
 
function cargaAlarma(data,corr){ //carga los datos de la alarma para mostrar en pantalla
   if(data!=null){
  $("#myModal3").modal("show");
      $("#IC15").val(data.ta_2.substr(8,2)+"-"+data.ta_2.substr(5,2)+"-"+data.ta_2.substr(0,4));
	  $("#IC14").val(data.ta_3.substr(8,2)+"-"+data.ta_3.substr(5,2)+"-"+data.ta_3.substr(0,4));
	  $("#btnGd1").click(function(){
		console.log("guarde2");
		actualizarAlarma(corr);
		$("[data-dismiss=modal]").trigger({ type: "click" });
		}//fin function
		);
	 return 0; }
	  else{
	   $("#myModal4").modal("show");
	   $("#btnGd").click(function(){
		console.log("guarde");
		nuevaAlarma(corr);
		$("[data-dismiss=modal]").trigger({ type: "click" });});
	   return 1;
	   }
 }
  
 function actualizarAlarma(data){ //Recoge los datos de los campos y realiza el fecth de actualizacion de alarma
	let b3 = $("#IC15").val().substr(6,4)+"-"+$("#IC15").val().substr(3,2)+"-"+$("#IC15").val().substr(0,2);
	let d3 = $("#IC14").val().substr(6,4)+"-"+$("#IC14").val().substr(3,2)+"-"+$("#IC14").val().substr(0,2);
	fetch( 'http://' + ip + ':'+ puerto +'/api/TA/UDF', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TA_1="+ data+"&TA_2="+ b3+"&TA_3="+ d3+"&TA_4=0"
      }
	  )
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
		if(b5!= "" && c5!=""){ 
		fetch( 'http://' + ip + ':'+ puerto +'/api/TA/I', {  
			method: 'POST', 
			datatype:'json',
			headers: {  
				"Content-type": "application/x-www-form-urlencoded"  
			} ,
			body: "TA_1="+ data+ "&TA_2="+ c5+ "&TA_3="+b5+"&TA_4="+ d5 
		}
	  )
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