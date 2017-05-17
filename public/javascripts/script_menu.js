
var ip = 'localhost';
var puerto = 3000;





function cargarMenu() //CArga el menu del sistema
{

	usr = JSON.parse(localStorage.getItem('usuario'));
    console.log(usr);
    var enc = '<nav class="navbar navbar-default" style="background-color:#60161E; ">'+
  '<div class="container-fluid">'+
   ' <!-- Brand and toggle get grouped for better mobile display -->'+
    '<div class="navbar-header">'+
      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'+
        '<span class="sr-only">Toggle navigation</span>'+
        '<span class="icon-bar"></span>'+
        '<span class="icon-bar"></span>'+
        '<span class="icon-bar"></span>'+
      '</button>'+
      '<IMG SRC="../images/situn2.png" WIDTH=90 HEIGHT=50  class="nav navbar-nav navbar-right" >'+
    '</div>'+

    '<!-- Collect the nav links, forms, and other content for toggling -->'+
    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="margin-left:70px">'+
     '<ul class="nav navbar-nav">'+
      '<li ><a href="../HTML/Ingreso de Correspondencia"style="color:#FFFFFF;">Ingreso de Correspondencia </a></li>'+
      '<li><a href="../HTML/Enlace de Documentos"style="color:#FFFFFF;">Enlace Documentos</a></li>'+
        '<li><a href="../HTML/Busqueda"style="color:#FFFFFF;">Búsqueda</a></li>'+
        '<li><a href="../HTML/Reportes"style="color:#FFFFFF;">Reportes</a></li>';


        if(usr.tipo === '1')
          {
            enc+= '<li class="dropdown" >'+
          '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color:#FFFFFF;">Usuarios <span class="caret"></span></a>'+
          '<ul class="dropdown-menu" style="background-color:#60161E; ">'+
            '<li><a href="../HTML/ingresaUser" style="color:#FFFFFF;">Agregar Usuario</a></li>'+
            '<li><a href="../HTML/BusquedaUsuarios" style="color:#FFFFFF;">Buscar Usuarios</a></li>'+
          '</ul>'+
        '</li>';


            
          }  

        enc+='<li><a href="" data-toggle="modal" data-target="#myAyuda" id="ayuda" style="color:#FFFFFF;">Ayuda</a></li>'+
                   '<li class="dropdown col-md-offset-0.6" >'+
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color:#FFFFFF;">'+usr.nombre+' '+usr.apellido +'<span class="caret"></span></a>'+
            '<ul class="dropdown-menu" style="background-color:#60161E; ">'+
            '<li><a href="javascript:void(0)" style="color:#FFFFFF;" ng-click="editarPerfil()">Editar Perfil</a></li>'+
            '<li><button style="color:#FFFFFF;" ng-click="editarPerfil()">Editar Perfil</button></li>'+
            '<li><a href="../logout" style="color:#FFFFFF;">Cerrar sesion</a></li>'+
          '</ul>'+
        '</li>'+

      '</ul>'+
    '</div><!-- /.navbar-collapse -->'+
  '</div><!-- /.container-fluid -->'+
'</nav>';
}

function solicitarInformacionDeSesion(page)//solicita los datos actualizados de la persona 
			//que esta loggeada
{
	
	$.ajax({  
      url: 'http://' + ip +':' + puerto + '/sessionInfo',  
      type: "GET",  
      mode:'no-cors',
      dataType: "json",  
      success: function(req) {  
        
        localStorage.setItem('usuario', JSON.stringify(req));
        var name = req.nombre + ' '+ req.apellido;
        $('#userInfo').html(name+'<span class="caret"></span>');
        $("#IC8").val(name);
        $("#menuDiv").load("/HTML/menu", function(){$(page).addClass("activa");}); 

      },  
      complete: function() {  

      }  

  });

}


function editarPerfil() 
{
	usuario = JSON.parse(localStorage.getItem('usuario'));
	console.log("Sol edicion perfil");
	asignarUsuarioP(usuario);
	$("#myModalP").modal('show');
}

function asignarUsuarioP(cor)
 {	desactivarP();
   limpiarValoresP();
   console.log(cor);
	 fetch( 'http://' + ip +':'+ puerto +'/api/TPTU/B', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1=" + cor.Id
      }
	)	 
	.then(res => res.json())
	.then(obj => cargarDatosUsuarioP(obj.data[0])
			)
	.catch(err => console.log('Request failed', err));
 }


function cargarDatosUsuarioP(data){
  console.log(data);
     $("#IPU1").val(data.tp_1);
     $("#IPU2").val(data.tp_2);
     $("#IPU3").val(data.tp_3);
	 $("#IPU0").val(data.tu_1);
	 $("#IPU4").val(data.tu_2);
	 $("#IPU8").val(data.tp_5);
	 if(data.tu_3 == 1)
		$("#administrador_checkboxP").prop("checked", "checked");
	 
	 else
		$("#administrador_checkboxP").prop("checked", "");

	$("#administrador_checkboxP").attr("disabled", true);
 }

  function actualizarInfoUsuarioP(){ //Actualiza la informacion en la base de datos
	var cod = 'No Definido';
	 actualizarPersonaP()
	.then( _=> actualizarUsuarioP()
		.then( _=> (
				$("ul.nav").children().each( (a,b) => cod= (cod =='No Definido' &&  b.className==='activa')?b.id:cod),
				solicitarInformacionDeSesion('#'+cod)
				
				)
		));
	$('#myModalP').hide();
    $('.modal-backdrop').hide();
  }

 
  
  function actualizarPersonaP(){ //actualiza la infromación del usuario en la tabla personas
    let a = $('#IPU0').val().toUpperCase();
	let b = $('#IPU1').val().toUpperCase();
	let c = $('#IPU2').val().toUpperCase(); 
	let d = $('#IPU3').val().toUpperCase(); 
	let e = $('#IPU8').val(); 
 
   return fetch( 'http://' + ip +':'+ puerto + '/api/TP/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_1="+ b+ "&TP_2="+c+
	"&TP_3="+ d + "&TP_4="+ a + "&TP_5="+ e 
      }
	  );
  }
  
  
  function actualizarUsuarioP(){ //actualiza la informaciòn del usuario
    let a = $('#IPU0').val();
	let b = $('#IPU4').val();
	
	let c = 0;
	if($("#administrador_checkboxP").prop("checked"))
		c = 1;
		
		
    return fetch( 'http://' + ip +':'+ puerto +'/api/TU/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1="+ a+ "&TU_2="+b+
	"&TU_3="+ c
      }
	  )
 
  }

  function activarP(){//Tiene la función del botón cambiar contraseña para habilitarlo
    $("#IPU4").removeAttr("disabled");
    $("#LIPU5").show();
    $("#IPU5").show();	
    $("#btnCambiar").hide();
  }
  
  function desactivarP(){
    $("#IPU4").attr('disabled','disabled');
    $("#LIPU5").hide();
    $("#IPU5").hide();
	$("#btnCambiar").show();
  }

var validatorPerfil;
function limpiarValoresP(){ //Limpia los valores de los campos de entrada
   $("#FormularioEdicionPerfil")[0].reset();
	validatorPerfil.submitted = {};
	validatorPerfil.elements().tooltipster('hide');
}
 