
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
	existeUsuario();	
	
	}
	
function ingresaInformacion($scope){ //Recoge los datos de los campos y realiza el fecth de inserción 
							//a la base de datos
							
	let e3 = $('#IU1').val().toUpperCase();
	let f3 = $('#IU2').val().toUpperCase();
	let g3 = $('#IU3').val().toUpperCase();
	let h3 = $('#IU4').val().toUpperCase();
	let o3 = $('#IU5').val();//.toUpperCase();
	let i3 = $('#IU8').val();
	let j3;
	if($("#IU7").prop("checked"))
	 j3 = '1'; 
	else
	j3='0';
	ingresaPersona(e3,f3,g3,h3,i3);
	ingresaUsuario(h3,o3,j3);
	$("#mensaje").text("Acción realiza con éxito");
 
}


function ingresaPersona(a,b,c,d,e){// Realiza la inserción de una persona a la base de datos

 fetch( 'http://' + ip + ':'+ puerto +'/api/TP/I', { 
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_1="+ a + "&TP_2="+ b +"&TP_3="+ c +"&TP_4="+ d + "&TP_5="+e
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
	
	function ingresaUsuario(a2,b2,c2){//Realiza la inserción de un usuario a la base de datos

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

 

function limpiaCampos(){//Limpia el valor de los campos de entrada

	$("#Formulario")[0].reset();
	validator.submitted = {};
	validator.elements().tooltipster('hide');
}


	var validator;
	

function botonCancelar(valor){//Metodo del boton cancelar 
limpiaCampos();
$("#mensaje").text("");

}
