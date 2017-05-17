function abrirBusqueda(b,$scope){
	localStorage.setItem('corres_B',b.tc_3);
	 window.open('http://' + ip +':'+ puerto +'/HTML/Busqueda','_self');
}


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
	$scope.BuscarCorrespondencia =b=> abrirBusqueda(b,$scope);
	$scope.sobre =_=> cambioCursorSobre();
	$scope.fuera =_=> cambioCursorAfuera();
	
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
 
 function checkCampoOficio(){ //Cambia el valor del campo referente al numero de oficio si la opcion SIN OFICIO esta marcada
if($("#IC12").is(':checked')){
	$("#IC2").val("SIN OFICIO");
	$('#IC2').focus();
	$("#IC2").prop("disabled",true);	
	}
	else{
	$("#IC2").val("");	
	$("#IC2").prop("disabled",false);
	$('#IC2').focus();
	}
}

function checkCampoCopia(){ //Cambia el valor del campo COPIA por la opción SIN COPIA
if($("#check_SinCopia").is(':checked')){
	$("#IC5").val("SIN COPIA");
	$('#IC5').focus();
	$("#IC5").prop("disabled",true);	
	}
	else{
	$("#IC5").val("");	
	$("#IC5").prop("disabled",false);
	$('#IC5').focus();
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
							fetch('http://'+ip+':'+puerto+'/upload', {
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



function botonCancelar(){//Metodo de cancelar
	limpiaDivMensaje();
	limpiarCampos();
	subePagina();//sube la pagina
}

var validator;
function limpiarCampos(){//Limpia el valor de los campos de entrada
	$("#Formulario")[0].reset();
	validator.submitted = {};
	validator.elements().tooltipster('hide');

	  solicitarInformacionDeSesion("#ICM");
	  $('#datetimepicker4').data("DateTimePicker").date(new Date());

	  $("#IC2").prop('disabled', false);
	  $("#IC5").prop('disabled', false);

	
}




function limpiaDivMensaje(){//Limpia el div con el id=mensaje
	$("#mensaje").text("");
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

	let parametro = $('#IC2').val().toUpperCase(); 
		ingresoCorrespondencia($scope);
		subePagina();
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
	
