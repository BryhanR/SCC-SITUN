
function existeUsuario(){//Realiza la consulta si un usuario existe
 
	let d = $('#IU4').val().toUpperCase();
	 fetch( 'http://' + ip + ':'+ puerto +'/api/TP/B', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_4="+ d
      }
	)	 .then(res => res.json())
     	
		.then(obj =>{
		if(obj.data[0]==null){
		setTimeout('botonCancelar(false)', 2000);
		ingresaInformacion();
		}
		else	
		$("#mensaje").text("Fallo al realizar la acción,\n el usuario a ingresar ya existe"); 
		
		}) 

		.catch(err => console.log('Request failed', err));
		
	

 }
		

	function botonGuardar(){//Realiza la función del boton de guardar llamando a los metodos correspondientes
	 if(validaCampos())
	existeUsuario();	
	
	
	}
	
function ingresaInformacion($scope){ //Recoge los datos de los campos y realiza el fecth de inserción 
							//a la base de datos
							
	let e3 = $('#IU1').val().toUpperCase();
	let f3 = $('#IU2').val().toUpperCase();
	let g3 = $('#IU3').val().toUpperCase();
	let h3 = $('#IU4').val().toUpperCase();
	let o3 = $('#IU5').val().toUpperCase();
	//let i3 = $('#IU6').val().toUpperCase();
	let j3;
	if($("#IU7").prop("checked"))
	 j3 = '1'; 
	else
	j3='0';
	ingresaPersona(e3,f3,g3,h3);
	ingresaUsuario(h3,o3,j3);
	$("#mensaje").text("Acción realiza con éxito");
 
}


function ingresaPersona(a,b,c,d){// Realiza la inserción de una persona a la base de datos

 fetch( 'http://' + ip + ':'+ puerto +'/api/TP/I', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_1="+ a + "&TP_2="+ b +"&TP_3="+ c +"&TP_4="+ d
      }
	  )
  .then(function(response) {
  return response.text().then(function(res) {
    console.log("Resultado: "+res);
    
  });
})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });

	}
	
	function ingresaUsuario(a2,b2,c2){//Realiza la inserciónde un usuario a la base de datos

	fetch( 'http://' + ip + ':'+ puerto +'/api/TU/I', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1="+ a2 + "&TU_2="+ b2 +"&TU_3="+ c2
      }
	  )
  .then(function(response) {
  return response.text().then(function(res) {
    console.log("Resultado: "+res);
    
  });
})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });

	}

   
<!--valida todos los campos--->
function validaCampos(){	 //Valida los campos 
	I1 = true;
	I2 = true;
	I3 = true;
	I4 = true;
	I5 = true;
	I6= true;
	I7= true;

	if($("#IU1").val().length == 0 ){
		cambioClase2(1);		
		I1 = false;
	}
	else{
	cambioClase1(1);
	}
		
	if($("#IU2").val().length == 0){
		cambioClase2(2);		
		I2 = false;
	}
	else{
		cambioClase1(2);
	}
	if($("#IU3").val().length == 0){
		cambioClase2(3);		
		I3 = false;
	}
	else{
		cambioClase1(3);
	}
	if($("#IU4").val().length == 0){
		cambioClase2(4);		
		I4 = false;
	}
	else{
		cambioClase1(4);
	}
	
	if(isNaN($("#IU4").val())){
		$("#div4").attr('class','form-group has-error') ;
		$("#IU4").attr('title','Formato incorrecto') ;
		I7 = false;
	}
	else{
	if(I7&&I4){
		cambioClase1(4);
		}
	}
	if($("#IU5").val().length == 0){
		cambioClase2(5);		
		I5 = false;
	}
	else{
		cambioClase1(5);
	}
	
	if($("#IU6").val().length == 0){
		cambioClase2(6);		
		I6 = false;
	}
	else{
		cambioClase1(6);
	}
	if($("#IU6").val()!=$("#IU5").val()){
	$("#div6").attr('class','form-group has-error') ;
		$("#IU6").attr('title','La contraseña no coincide') ;
		$("#div5").attr('class','form-group has-error') ;
		$("#IU5").attr('title','La contraseña no coincide') ;
		$("#IU5").val("");
		$("#IU6").val("");
		I6 = false;
	}
	else{
	if(I6&&I5){
		cambioClase1(6);
		cambioClase1(5);
	}
	
		return (I1 && I2  && I3  && I4 && I5 && I6 &&I7);	
}}

function limpiaCampos(){//Limpia el valor de los campos de entrada
for(let i=1;i<7;i++){
	cambioClase1(i);
}
	$("#IU1").val("");
	$("#IU2").val("");
	$("#IU3").val("");
	$("#IU4").val("");
	$("#IU5").val("");
	$("#IU6").val("");
}

function cambioClase1(op){//Realiza un cambio de clase a los campos de entrada del formulario de la clase has-error a from-group
	switch(op){
	case 1: $("#div1").attr('class','form-group') ;
			$("#IU1").attr('title','');
			break;
	
	case 2: $("#div2").attr('class','form-group') ;
			$("#IU2").attr('title','');
			break;
	case 3: $("#div3").attr('class','form-group') ;
			$("#IU3").attr('title','');
			break;
	case 4: $("#div4").attr('class','form-group') ;
			$("#IU4").attr('title','');
			break;
	case 5: $("#div5").attr('class','form-group') ;
			$("#IU5").attr('title','');
			break;
	case 6: $("#div6").attr('class','form-group') ;
			$("#IU6").attr('title','');
			break;
	
	default: break;
	}
}	
	
function botonCancelar(valor){//Metodo del boton cancelar 
if(valor==true){
limpiaCampos();
limpiaDivMensaje();
	}
else
{limpiaCampos();}
if($("#IU7").is(':checked'))
	$("#IU7").prop("checked",false);
}

function limpiaDivMensaje(){//Limpia el div con el id=mensaje 
$("#mensaje").text("");
}
 
function limpiaCamposEnfocados(n){//Limpia los campos cuando se enfocan 
  limpiaDivMensaje();
  cambioClase1(n);
 }
 	  
	  

function cambioClase2(op){//Realiza un cambio de clase a los campos de entrada del formulario de la clase from-group a has-error
	switch(op){
	case 1: $("#div1").attr('class','form-group has-error') ;
			$("#IU1").attr('title','Campo Obligatorio');
			break;
	
	case 2: $("#div2").attr('class','form-group has-error') ;
			$("#IU2").attr('title','Campo Obligatorio');
			break;
	case 3: $("#div3").attr('class','form-group has-error') ;
			$("#IU3").attr('title','Campo Obligatorio');
			break;
	case 4: $("#div4").attr('class','form-group has-error') ;
			$("#IU4").attr('title','Campo Obligatorio');
			break;
	case 5: $("#div5").attr('class','form-group has-error') ;
			$("#IU5").attr('title','Campo Obligatorio');
			break;
	case 6: $("#div6").attr('class','form-group has-error') ;
			$("#IU6").attr('title','Campo Obligatorio');
			break;
	
	default: break;
	}
}