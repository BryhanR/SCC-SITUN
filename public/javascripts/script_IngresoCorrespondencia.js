

function dato_Adjunto(){ //
adj= $('#adjun').prop('files');
$('#input_adjunto').val(adj[0].name);
}


function controllerAngular($scope)//ControllerAngular 
 {
	$scope.alarmas = new Array();
	$scope.updateAlarmas= c => $scope.alarmas = c;
	$scope.init = _ => actualizaTablaAlarmas($scope);	
	$scope.visto = a => eliminaAlarma(a, $scope);
	$scope.guardarCorrespondencia =   _  => existeCorrespondencia($scope);
	$scope.updateU = u => $scope.usuario = u;
	$scope.usuario = "gaga";
  }
  
  
  function actualizaTablaAlarmas($scope) { //Actualiza la tabla de alarmas
  
	 fetch( 'http://' + ip + ':'+ puerto +'/api/TA/ALL_FECHA', {  
    method: 'POST', 
    mode: 'no-cors',
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } 
      }
	)	
	.then(res => res.json())
	.then(obj => $scope.$apply( _=>	$scope.updateAlarmas(obj.data)))
	.catch(err => console.log('Request failed', err));
 }
 
 function eliminaAlarma(a, $scope){ //Elimina las alarmas de la tabla

$("#IC15").click(function(){
    fetch( 'http://' + ip + ':'+ puerto +'/api/TA/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TA_1="+ a.ta_1+ "&TA_2="+ a.ta_2+ "&TA_3="+a.ta_3+
	"&TA_4="+ 1
      }
	  )
  .then(function(response) {
  return response.text().then(function(res) {
     actualizaTablaAlarmas($scope);
    console.log("Resultado: "+res);
  });
})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
		});
	
	}
 
 function limpiaCamposEnfocados(n){//Limpia los campos cuando se enfocan
  limpiaDivMensaje();
  cambioClase1(n);

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

function checkCampoCopia(){ //Cambia el valor del campo COPIA por la opción SIN COPIA
if($("#check_SinCopia").is(':checked')){
	$("#IC5").val("SIN COPIA");
	$("#IC5").prop("disabled",true);	
	}
	else{
	$("#IC5").val("");
	$("#IC5").prop("disabled",false);
	}
}

function ingresoCorrespondencia($scope){ //Recoge los datos de los campos y realiza el fecth de inserción 
							//a la base de datos
	let fecha1=$('#IC1').val();

	let b3 = fecha1.substring(10, 6)+'-'+fecha1.substring(5, 3)+'-'+fecha1.substring(2, 0);
	
	console.log("b3"+b3);
	let c3 = $('#IC2').val().toUpperCase(); 
	let fecha=$('#IC3').val();
	let d3 = fecha.substring(10, 6)+'-'+fecha.substring(5, 3)+'-'+fecha.substring(2, 0);
	let e3 = $('#IC4').val().toUpperCase();
	let f3 = $('#IC5').val().toUpperCase();
	let g3 = $('#IC6').val().toUpperCase();
	let h3 = $('#IC7').val().toUpperCase();
  u = JSON.parse(localStorage.getItem('usuario'));
	let i3 = u.Id; 
	let j3 = $('#IC9').val().toUpperCase();
    let k3 = $('#IC10').val().toUpperCase();
	let doc = $('#input_adjunto').val();

  
  console.log("xxx "+b3);
 fetch( 'http://' + ip + ':'+ puerto +'/api/TC/I', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded",

      } ,
    body: "TC_2="+ b3+ "&TC_3="+c3+
	"&TC_4="+ d3 + "&TC_5="+ e3 +"&TC_6="+ f3 + 
	"&TC_7="+ g3 + "&TC_8="+ h3 +"&TC_9="+ i3+"&TC_10="+ j3+ "&TC_11="+ k3 + "&TC_12="+doc
      }
	  )
  .then(function(response) {

		return response.text().then(function(res) {
				console.log("Resultado: "+res);
					if(res.indexOf("error")==-1){
						$("#mensaje").text("Acción realizada con éxito");
							programaAlarma($scope); 
							console.log($("#enlace_checkbox").is(':checked'));
							if($("#enlace_checkbox").is(':checked'))
							{
								consultaIdCorrespondencia();
							}
							if(doc!=''){ 
							 var formData  = new FormData();		
							 formData.append('arc', adj[0]);
							fetch('http://localhost:3000/upload', {
    						method: 'POST',
    						body: formData
  });
							}
					}
					else
						$("#mensaje").text("Fallo al realizar la acción"); 
				});
	})
  .catch(function(error) {  
     console.log('Request failed', error);  
  });
  
}


function validacionCampos(){	 //Valida todos los campos 
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
	
	if($("#IC1").val().length == 0){
		cambioClase3(1);
		IC1 = false;
	}
	else{
	cambioClase1(1);
	}
	if($("#IC2").val().length == 0){
		cambioClase3(2);		
		IC2 = false;
	}
	else{
		cambioClase1(2);
	}
	
	if($("#IC3").val().length == 0){
		cambioClase3(3);
		IC3 = false;
	}
	else{
		cambioClase1(3);
		}
	if($("#IC4").val().length == 0){
		cambioClase3(4);
		IC4 = false;
	}
	else{
		cambioClase1(4);
	}
	if($("#IC5").val().length == 0){
		cambioClase3(5); 
		IC5 = false;
	}
	else{
		cambioClase1(5);
	}
	if($("#IC6").val().length == 0){
		cambioClase3(6);
		IC6 = false;
	}
	else{
		cambioClase1(6);
	}
	if($("#IC7").val().length == 0){
		cambioClase3(7);
		IC7 = false;
	}
	else{
		cambioClase1(7);
	}
	if($("#IC8").val().length == 0){
		cambioClase3(8);
		IC8 = false;
	}
	else{
		cambioClase1(8);
	}
	if($("#IC9").val().length == 0){
		cambioClase3(9);
		IC9 = false;
	}
	else{
		cambioClase1(9);
	}
	if( $("#IC13").val().length != 0 ||   $("#IC14").val().length != 0  ){ // En caso de programar la alarma
	  var aux=validacionCamposAlarma();
		return (IC1 && IC2  && IC3  && IC4 	&& IC5 && IC6 && IC7 && IC8 && IC9 && aux &&cambioClase2());
		}
		else{
		return (IC1 && IC2  && IC3  && IC4 	&& IC5 && IC6 && IC7 && IC8 && IC9 && cambioClase2());
		}
}
<!--limpia todos los campos--->
function botonCancelar(){//Metodo de cancelar
	limpiarCampos();
	limpiaDivMensaje();
	  //$("[data-toggle='tooltip']")removeAttr("data-original-title");
	
	subePagina();//sube la pagina
}
function limpiarCampos(){//Limpia el valor de los campos de entrada
	for(let i=1;i<10;i++){
	cambioClase1(i);
}
	$("#IC2").val("");
	$("#IC2").removeAttr("disabled");
	$("#IC3").val("");
	$("#IC4").val("");
	$("#IC5").val("");
	$("#IC5").removeAttr("disabled");
	$("#IC6").val("");
	$("#IC7").val("");
	$("#IC9").val("");
	$("#IC10").val("");
	$("#IC13").val("");
	$("#IC14").val("");
	$("#IC12").prop("checked",false);
	$("#IC2").prop("checked",false);
	$("#check_SinCopia").prop("checked",false);
	$('#adjun').val(""); 
    $('#input_adjunto').val(""); 
	$( "#enlace_checkbox" ).prop( "checked", false );
	}
function limpiaDivMensaje(){//Limpia el div con el id=mensaje
	$("#mensaje").text("");
    $("#IC1").removeAttr("data-original-title");
	$("#IC2").removeAttr("data-original-title");
	$("#IC3").removeAttr("data-original-title");
	$("#IC4").removeAttr("data-original-title");
	$("#IC5").removeAttr("data-original-title");
	$("#IC6").removeAttr("data-original-title");
	$("#IC7").removeAttr("data-original-title");
	$("#IC8").removeAttr("data-original-title");
	$("#IC9").removeAttr("data-original-title");
}
function cambioClase1(op){//Realiza un cambio de clase a los campos de entrada del formulario de la clase has-error a from-group
	switch(op){
	case 1: $("#datetimepicker4").attr('class','input-append  form-group') ;
				$("#IC1").attr('title','') ;
				$(document).ready(function(){
				$("[id='IC1']").tooltip('hide');
			});
			break;
	case 2: $("#div2").attr('class','input-append  form-group') ;
				$("#IC2").attr('title','') ;
				$(document).ready(function(){
				$("[id='IC2']").tooltip('hide');
			});
			break;
	case 3: $("#datetimepicker3").attr('class','input-append  form-group') ;
	$("#IC3").attr('title','') ;
					$(document).ready(function(){
   $("[id='IC3']").tooltip('hide');
});
			break;
	case 4: $("#div4").attr('class','input-append  form-group') ;
	$("#IC4").attr('title','') ;
						$(document).ready(function(){
   $("[id='IC4']").tooltip('hide');
});
			break;
	case 5: $("#div5").attr('class','input-append  form-group') ;
	$("#IC5").attr('title','') ;
					$(document).ready(function(){
   $("[id='IC5']").tooltip('hide');
});
			break;
	case 6: $("#div6").attr('class','input-append  form-group') ;
			$("#IC6").attr('title','') ;
						$(document).ready(function(){
   $("[id='IC6']").tooltip('hide');
});
			break;
	case 7: $("#div7").attr('class','input-append  form-group') ;
			$("#IC7").attr('title','') ;
					$(document).ready(function(){
   $("[id='IC7']").tooltip('hide');
});
			break;
	case 8: $("#div8").attr('class','input-append  form-group') ;
			$("#IC8").attr('title','') ;
						$(document).ready(function(){
   $("[id='IC8']").tooltip('hide');
});
			break;
	case 9: $("#div9").attr('class','input-append  form-group') ;
			$("#IC9").attr('title','') ;
						$(document).ready(function(){
   $("[id='IC9']").tooltip('hide');
});
			break;
	
	
	default: break;
	}
}
function cambioClase2(){//Realiza el cambio de clase de los campon de fecha del formulario a la clase has-error
	let fechaR=$("#IC1").val();
	//La fecha debe de llevar el formato YYYY/MM/dd
	
	let recibido=fechaR.substring(10, 6)+'-'+fechaR.substring(5, 3)+'-'+fechaR.substring(2, 0);
	
	
	
		let fecha2=$("#IC3").val();
	//La fecha debe de llevar el formato YYYY/MM/dd
	
	let oficio=fecha2.substring(10, 6)+'-'+fecha2.substring(5, 3)+'-'+fecha2.substring(2, 0);
	
	if(oficio<=recibido){
		$("#datetimepicker4").attr('class','input-append  form-group') ;
		$("#IC1").attr('title','') ;
		$("#datetimepicker3").attr('class','input-append  form-group') ;
		$("#IC3").attr('title','') ;
	return true;}
	else{
		$("#datetimepicker4").attr('class','input-append form-group has-error') ;
		$("#IC1").attr('title','La fecha de oficio no debe ser mayor que la fecha de recibido') ;
		$("#datetimepicker3").attr('class','input-append form-group has-error') ;
		$("#IC3").attr('title','La fecha de oficio no debe ser mayor que la fecha de recibido') ;
		return false;}
}
function consultaIdCorrespondencia(){//Realiza la consulta del id de la ultima correspondencia ingresada
					//Guarda el dato en el localstorage y cambia a la pagina a la de enlace
		fetch( 'http://' + ip + ':'+ puerto +'/api/TC/BC', {  
			method: 'GET', 
			datatype:'json',
			headers: {  
				"Content-type": "application/x-www-form-urlencoded"  
			} 
		})
		.then(res =>res.json())
		.then(obj =>{
			localStorage.clear();
			let y = obj.data[0].tc_1; // TC_1
			let correspondencia = new Correspondencia(obj.data[0].tc_3,y,true); // // Aqui necesitamos los datos de la correspondencia de la BD
			localStorage.setItem("user",JSON.stringify(correspondencia));
		})
		.then( _ => window.location.href='http://' + ip + ':'+ puerto +'/HTML/Enlace%20de%20Documentos')
		.catch(function(error) {  
			console.log('Request failed', error);  
		});
 	}

function existeCorrespondencia($scope){//Realiza la consulta si la correspondencia a ingresar ya existe
	if(validacionCampos() == false){
	     $("#mensaje").text("Campos requeridos");
		 subePagina();
	     return;
		}
	let parametro = $('#IC2').val().toUpperCase(); 
	fetch( 'http://' + ip + ':'+ puerto +'/api/TC/BO', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TC_3="+ parametro
      }
	)	 
	.then(res => res.json())
     .then(obj => {
		if(obj.data[0]==null)
			ingresoCorrespondencia($scope);
		else{ 
			if(obj.data[0].tc_3=="SIN OFICIO")
			ingresoCorrespondencia($scope);
			else
			{
			subePagina();
			$("#mensaje").text("Fallo al realizar la acción, la correspondencia a ingresar ya existe"); 
			}
	  
		}
   })
	.then( _ => subePagina())
	.catch(err => {
		console.log('Request failed', err)});
		
	}
	
	
	
	
	function programaAlarma($scope){//Programa una alarma de una correspondencia 
	var aux = ultimaCorrespondencia();
	aux.then(data=> {
		let a5 = data;  // Cambiar eso falta
		let b5 = $('#IC13').val().toUpperCase(); 
		let c5 = $('#IC14').val().toUpperCase();
		console.log('Fecha limte '+b5);  // QUITAR
			console.log('Fecha aviso '+c5);
		let d5 = 0;
	    if( !$("#enlace_checkbox").is(':checked'))
		{
			limpiarCampos();
		}
		if(b5!= "" && c5!=""){ 
		fetch( 'http://' + ip + ':'+ puerto +'/api/TA/I', {  
			method: 'POST', 
			datatype:'json',
			headers: {  
				"Content-type": "application/x-www-form-urlencoded"  
			} ,
			body: "TA_1="+ a5+ "&TA_2="+ b5+ "&TA_3="+c5+"&TA_4="+ d5 
		}
	  )
		.then(function(response) {
			return response.text().then(function(res) {
				actualizaTablaAlarmas($scope);
					console.log("Resultado enlace: "+res);
                 $("#op > option[value=Nd]").attr("selected",true);
				
				
			});
		})
		.catch(function(error) {  
			console.log('Request failed', error);  
		});
		}
	});
	}
	
	function subePagina() {
	if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
	window.scrollBy(0, -15);
	arriba = setTimeout('subePagina()', 10);
	}
	else clearTimeout(arriba);
	}
	
	function ultimaCorrespondencia(){  //Devuelve el ultimo codigo de la ultima correspondencia
	return Promise.resolve(fetch( 'http://' + ip + ':'+ puerto +'/api/TC/BC', {  
    method: 'GET', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } 
      }
	  )
   .then(res =>res.json())
   .then(obj =>obj.data[0].tc_1)
  
  .catch(function(error) {  
   console.log('Request failed', error);  
  })
   	);
	}
	
function validacionCamposAlarma(){// Validación de los campos de fecha limite y fecha de aviso de la alarma
let A1=true;
let  A2=true;
let A3= true;
let  A4 = true;
let A5 = true;
let A6= true;

let fechaAviso=$("#IC14").val();//Toma el valor del campo de la fecha
let fechaLimite=$("#IC13").val();
var d=new Date();
let fecha1 = d.getFullYear() + '-'+((d.getMonth()+1<10)?'0':'') +(d.getMonth()+1) + '-' + ((d.getDate()<10)?'0':'') + d.getDate();

if(fechaAviso.length == 0 || fechaLimite.length == 0){
	
	if( fechaAviso.length == 0){
		$("#datetimepicker5").attr('class','input-append form-group has-error') ;
		$("#IC14").attr('title','Campo Obligatorio') ;
		A1=false;
	}
	else{
	$("#datetimepicker5").attr('class','input-append  form-group') ;
		$("#IC14").attr('title','') ;
	}
	
	  if(fechaLimite.length == 0){
		$("#datetimepicker6").attr('class','input-append form-group has-error') ;
			$("#IC13").attr('title','Campo Obligatorio') ;
		A2=false;
	}
	else{
	$("#datetimepicker6").attr('class','input-append  form-group') ;
		$("#IC13").attr('title','') ;
	}
	
	}
	
	
	
	
	if( fechaAviso.length != 0  && fechaLimite.length != 0  ){
	
	let fA=fechaAviso.substring(10, 6)+'-'+fechaAviso.substring(5, 3)+'-'+fechaAviso.substring(2, 0);
	let fL=fechaLimite.substring(10, 6)+'-'+fechaLimite.substring(5, 3)+'-'+fechaLimite.substring(2, 0);

	if(fA< fecha1){
	 $("#datetimepicker5").attr('class','input-append form-group has-error') ;
	$("#IC14").attr('title','La fecha de aviso de la alarma debe ser mayor a la fecha Actual') ;
	A3=false;
	
	}
	else{
		$("#datetimepicker5").attr('class','input-append  form-group') ;
		$("#IC14").attr('title','') ;
	if(fA>fL){
	$("#datetimepicker5").attr('class','input-append form-group has-error') ;
	$("#IC14").attr('title','La fecha de Aviso de la alarma no puede ser mayor a la fecha limite de respuesta del documento') ;
	A4=false;
	
	}
	else{
	$("#datetimepicker5").attr('class','input-append  form-group') ;
	$("#IC14").attr('title','') ;
	}
	}
	
    if(fL< fecha1){
	$("#datetimepicker6").attr('class','input-append  form-group has-error') ;
	$("#IC13").attr('title','La fecha Limite de respuesta del documento debe ser mayor a la fecha Actual') ;
	A5=false;
	
	}
	else{
	$("#datetimepicker6").attr('class','input-append  form-group');
	$("#IC13").attr('title','') ;
	if(fA>fL){
	$("#datetimepicker5").attr('class','input-append  form-group has-error') ;
	$("#IC13").attr('title','La fecha de aviso de la alarma no puede ser mayor a la fecha limite de respuesta del documento') ;
	A6=false;
	
	}
	else{
	$("#datetimepicker5").attr('class','input-append  form-group') ;
	$("#IC14").attr('title','') ;
	}
	}
	
	
	}

	return  ( A1 && A2 && A3  && A4 && A5 && A6 ); 
}

function cambioClase3(op){//Realiza un cambio de clase a los campos de entrada del formulario de la from-group a la clase has-error
	switch(op){
	case 1: $("#datetimepicker4").attr('class','input-append form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC1']").tooltip('show');
});
			break;
	case 2: $("#div2").attr('class','form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC2']").tooltip('show');
});
			break;
	case 3: $("#datetimepicker3").attr('class','input-append form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC3']").tooltip('show');
});
			break;
	case 4: $("#div4").attr('class','form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC4']").tooltip('show');
});
			break;
	case 5: $("#div5").attr('class','form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC5']").tooltip('show');
});
			break;
	case 6: $("#div6").attr('class','form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC6']").tooltip('show');
});
			break;
	case 7: $("#div7").attr('class','form-group has-error') ;

					$(document).ready(function(){
   $("[id='IC7']").tooltip('show');
});
			break;
	case 8: $("#div8").attr('class','form-group has-error') ;

			$(document).ready(function(){
   $("[id='IC8']").tooltip('show');
});
			break;
	case 9: $("#div9").attr('class','form-group has-error') ;
	$(document).ready(function(){
$("[id='IC9']").tooltip('show');
});
			
			break;
	
	
	default: break;
	}
}
    
	
	

