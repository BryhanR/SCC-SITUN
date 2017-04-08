
function MR_01($scope)//ControllerAngular controller de todos los metodos
 {

	$scope.correspondencias = new Array();
	$scope.updateCorrespondencias = c => $scope.correspondencias = c;
	$scope.buscar = _ => MR_02($scope);
	$scope.clear = _ => MR_03($scope);
	$scope.generarReporte = _ =>MR_04($scope);
	
  }
  
  
 function MR_02($scope)  //Metodo de Busqueda , substrae las fechas y las manda como rango de fecha
 {
   
	let fecha1 = $('#f1').val();
	let fecha2 = $('#f2').val();
	let usuario = JSON.parse(localStorage.getItem('usuario'));
	let fecha = new Date();
	if(MR_05() == true )  {
	
	if(MR_06() == true )  {
	

	$("#tabla_encabezado tr").detach(); //Limpia el encabezado
	
	let table =document.getElementById("tabla_encabezado");
	
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
	
	let cell1 = row.insertCell(0);
	let element1 = document.createTextNode("Desde :");
    cell1.appendChild(element1);
	
    let cell2 = row.insertCell(1);
    let element2 = document.createTextNode(fecha1);
     cell2.appendChild(element2);
   
    let cell3 = row.insertCell(2);
	let element3 = document.createTextNode("Hasta :");
    cell3.appendChild(element3);
	
    let cell4 = row.insertCell(3);
    let element4 = document.createTextNode(fecha2);
     cell4.appendChild(element4);
//--------------------------------------------------
 	rowCount = table.rows.length;
    row = table.insertRow(rowCount);

     let cell5 = row.insertCell(0);
	let element5 = document.createTextNode("Creado por :");
    cell5.appendChild(element5);
	
    let cell6 = row.insertCell(1);
    let element6 = document.createTextNode(usuario.nombre+' '+usuario.apellido);
     cell6.appendChild(element6);

     let cell7 = row.insertCell(2);
	let element7 = document.createTextNode("Identificación :");
    cell7.appendChild(element7);
	
    let cell8 = row.insertCell(3);
    let element8 = document.createTextNode(usuario.Id);
     cell8.appendChild(element8);

     //--------------------------------------------------
 	rowCount = table.rows.length;
    row = table.insertRow(rowCount);

     let cell9 = row.insertCell(0);
	let element9 = document.createTextNode("Fecha :");
    cell9.appendChild(element9);
	
    let cell10 = row.insertCell(1);
    let element10 = document.createTextNode(moment(fecha).format('DD/MM/YYYY'));//fecha.toString('dd-MM-yyyy');
     cell10.appendChild(element10);

     let cell11 = row.insertCell(2);
	let element11 = document.createTextNode("Hora :");
    cell11.appendChild(element11);
	
    let cell12 = row.insertCell(3);
    let element12 = document.createTextNode(moment(fecha).format('hh:mm:ss A'));
     cell12.appendChild(element12);
	

	//Busca las correspondecias segun el rango de fechas
    fetch( 'http://' + ip + ':'+ puerto +'/api/TC/BF', {   //Envia la ruta del servidor (rutas.js) y el sufijo Correspondiente
    method: 'POST',  
    datatype:'json',   
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
	 body: "TC_4F1=" + fecha1 + "&TC_4F2=" + fecha2
      }
	)	 
	.then(res => res.json())
	.then(obj => ($('#dwpdf').show(),
					$scope.$apply( _=>
	             	 $scope.updateCorrespondencias(obj.data) ))
	)
	.catch(err => console.log('Request failed', err));
    
	 
	
		}
	} 

		
 }
 
 
 
 
 
function MR_03($scope){// limpia 
    $('#f1').val("");
	$('#f2').val("");
	$scope.correspondencias = new Array();
	$("#tabla_encabezado tr").detach();
	$("#mensaje").text(""); 
	$("#dwpdf").hide();

} 
	

function MR_04($scope){ //Metodo que genera el reporte

if(MR_05()){
let pdf = new jsPDF('l', 'pt', 'letter');
let source =  $('#HTMLtoPDF')[0] ;
pdf.setFontSize(15);
specialElementHandlers = {
	'#bypassme': function(element, renderer){
		return true
	}
}
margins = {
    top: 50,
    left: 25,
    width: 600
  };
  
pdf.fromHTML(
    source // El cuerpo del PDF en este caso HTML o string
  	, margins.left // x coordenada x
  	, margins.top // y coordenada y
  	, {
  		'width': margins.width 
  		, 'elementHandlers': specialElementHandlers
  	},
  	function (dispose) {
  		t ="{total_pages_count_string}";
  		str = 'total pages: ' + t;
  		//pdf.text(150,pdf.internal.pageSize.height, str);
        pdf.save('ReporteCorrespondencia.pdf');
      }
  )		
  
  }
}



function MR_05(){  //Metodo para validar fechas vacias
let A1=true;
let A2=true;
let A3=true;
let A4=true;



let fecha1=$("#f1").val();//Toma el valor del campo de la fecha
let fecha2=$("#f2").val();//Toma el valor del campo de la fecha

if(fecha1.length < 1 || fecha2.length < 1 ){

if(fecha1.length < 1 ){


  
   $("#c1").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
    $("#f1").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
	$("#f1").attr('title','Campo Obligatorio') ;
	A1=false;
	
	}
	else{
  
     $("#c1").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
     $("#f1").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
	 $("#f1").attr('title','') ;
	}
	
	


if(fecha2.length < 1 ){


  
   $("#c2").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
    $("#f2").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
	$("#f2").attr('title','Campo Obligatorio') ;
	A2=false;
	
	}
	else{
  
     $("#c2").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
     $("#f2").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
	 $("#f2").attr('title','') ;
	}
	
	}
	
	
	if( fecha1.length != 0  && fecha2.length != 0  ){
		
		let f1=fecha1.substring(10, 6)+'-'+fecha1.substring(5, 3)+'-'+fecha1.substring(2, 0);
	    let f2=fecha2.substring(10, 6)+'-'+fecha2.substring(5, 3)+'-'+fecha2.substring(2, 0);
		
		if(f1 > f2 ){
         
		  $("#c1").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
          $("#f1").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
	      $("#f1").attr('title','Fecha Inicial debe ser menor a Fecha Final') ;
		  
		    $("#c2").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
          $("#f2").css( "box-shadow" , " 0px 0px 1px 1px  #540c0c");
	      $("#f2").attr('title','Fecha Final debe ser mayor a FechaInicial') ;
		  
		  
		  A3=false;
		 }
		 else {
		$("#c1").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
        $("#f1").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
	    $("#f1").attr('title','') ;
		
	    $("#c2").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
        $("#f2").css( "box-shadow" , " 0px 0px 1px 1px  #FFFFFF");
	    $("#f2").attr('title','') ;
		
		 }
		
		 
		 
		 }
		
		
			return   (  A1 && A2 && A3 ) ; 
}

		
	
function MR_06(){ //Metodo para validar rango de fechas

fetch( 'http://' + ip + ':'+ puerto +'/api/TC/FR', {   //Envia la ruta del servidor (rutas.js) y el sufijo Correspondiente
    method: 'POST',  
    datatype:'json',   
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } 
      }
	)	 
	.then(res => res.json())
	.then(obj => {
	
		  
     
	 let fecha1 = $('#f1').val();
     let fecha2=obj.data[0].tc_4;

	let fA=fecha1.substring(10, 6)+'-'+fecha1.substring(5, 3)+'-'+fecha1.substring(2, 0);
	
	if(fecha2 < fA ){
	$("#mensaje").text("No hay correspondencias almacenadas que se encuentren en ese rango de fechas"); 
	return false;
    }
	else{
	$("#mensaje").text("");
	}
	
	})
	.catch(err => console.log('Request failed', err));
    

return true;

}

	     
	

