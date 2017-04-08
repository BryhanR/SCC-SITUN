var express = require('express');
var router = express.Router();
var path    = require("path");
var db = require('../public/javascripts/server');

var app = express();
var url = require("url");

var passport = require('passport');

var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.isAuthenticated())
	{
		res.render('Ingreso de Correspondencia');
	}

	var obj = { mensaje: 'Usuario y/o clave incorrectos', 
	error: req.session.retry,
	usr: req.session.usr,
	pass: req.session.pass
	};
	req.session.retry = false;
  res.render('index', obj);
});

router.post('/login',passport.authenticate('local-login',{
	successRedirect: '/HTML/Ingreso de Correspondencia',
	failureRedirect: '/',
	filureFlash: false
}));

router.post('/upload',function(req, res){
	var entrada = new formidable.IncomingForm();
	entrada.uploadDir ='Adjunto';
	entrada.parse(req);
    entrada.on('fileBegin', function(field, file){
        file.path = "./public/Adjunto/"+file.name;
    });	
    entrada.on('end', function(){
		
		res.end();
    });
	console.log("Solicitud de upload...");
});

router.get('/logout',function(req, res){
	req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/sessionInfo',function(req, res, next){
	console.log("Solicitud de info de sesson... ");

	updateSessionInfo(req)
	.then(_ => res.json(req.session.usuario))
	.catch(e => console.log("Error en seeesion info"));
	
});

function updateSessionInfo(req)
{
	console.log("actualizando info...");
	return db.getUSR({TU_1:req.session.usuario.Id})
	.then(function(data){
		usr = data[0];
		console.log("nuevos datos....");

		req.session.usuario = {
						nombre: usr.tp_1,
						apellido: usr.tp_2,
						tipo: usr.tu_3,
						Id: usr.tu_1
					};
		console.log(req.session.usuario);
	});
}

router.get('/HTML/*', function(req, res, next) {
  console.log("Ingresando al Buscar desde " + req.url); 
  console.log(req.session.passport);
	if(!req.isAuthenticated())
	{
		console.log("No esta loggeado...");
		res.redirect('/');
	}
	else{
		console.log("Si esta loggeado XD");
		var dir = (req.url.replace(/%20/g, " ")).substr(6);
		console.log(req.session.usuario);
		console.log(dir);
		res.render(dir);
	}
});


//----------- BUSQUEDA EN TABLAS -------------------------------------
router.post('/api/ALL/ENLACES',db.getAllEnlaces);       // Busqueda todos lo TP

//----------- DEVOLUCION DE TODO LOS DATOS DE UNA TABLA -------------------------------------
router.post('/api/TP/ALL',db.getAllTP);       // Busqueda todos lo TP
router.post('/api/TU/ALL',db.getAllTU);		// Busqueda todos lo TU
router.post('/api/TC/ALL',db.getAllTC);		// Busqueda todos lo TC


//----------- DEVOLUCION DE DATOS DE UNA TABLA SEGUN UNA CONDICION ----------
router.post('/api/TPTU/B',db.getTPTU);// Busqueda TP Y TU especifico
router.post('/api/TP/B', db.getSingleTP); // Busqueda TP especifico identificacion
router.post('/api/TC/FR', db.getSingleTC); // Busqueda TC especifico fechaRecibido
router.post('/api/TP/BN',db.getALLTP1); // Busqueda TP nombre
router.post('/api/TP/BA1',db.getALLTP2); // Busqueda TP Primer apellido
router.post('/api/TP/BA2',db.getALLTP3); // Busqueda TP Primer apellido
router.post('/api/TU/B', db.getSingleTU); // Busqueda TU especifico
router.post('/api/TC/BO', db.getALLTC1); // Busqueda TC  oficio
router.post('/api/TC/BD', db.getALLTC2); // Busqueda TC  destinatario
router.post('/api/TC/BR', db.getALLTC3); // Busqueda TC  remitente
router.post('/api/TC/BA', db.getALLTC4); // Busqueda TC  asunto
router.post('/api/TC/BC', db.getALLTC5); // Busqueda TC  codigo
router.post('/api/TC/BF', db.getALLTC6); // Busqueda TC  fecha
router.post('/api/TE/ALL_ONE',db.getALLTE_ONE);	// Busqueda Todos los enlaces sobre un documento
router.post('/api/TA/ALL_FECHA',db.getALLTA_FECHA);	// Busqueda Todos las alarmas antes de la fecha
router.post('/api/TA/ALL_TA',db.getALLTA1);	// Busqueda alarma por primary key
router.get('/api/TC/BC',db.getLastTC); // Busqueda TC recupera ultimo id de la tabla TC

//----------- INSERTAR EN TABLAS ----------------------------------------
router.post('/api/TP/I', db.createTP);	// Insertando en TP
router.post('/api/TU/I', db.createTU);  // Insertando en TU
router.post('/api/TC/I', db.createTC);  // Insertando en TC
router.post('/api/TE/I', db.createTE);  // Insertando en TE
router.post('/api/TA/I', db.createTA);  // Insertando en TA

//----------- ACTUALIZACIONES EN TABLAS ---------------------------------
router.post('/api/TP/UD', db.updateTP); // Actualizar TP especifico
router.post('/api/TU/UD', db.updateTU); // Actualizar TU especifico
router.post('/api/TC/UD', db.updateTC); // Actualizar TC especifico
router.post('/api/TE/UD', db.updateTE); // Actualizar TE especifico
router.post('/api/TA/UD', db.updateTA); // Actualizar TA especifico
router.post('/api/TA/UDF', db.updateTAFechas); // Actualizar TA especifico solo fechas

//----------- ELIMINACIONES EN TABLAS -----------------------------------
router.get('/api/TP/D', db.removeTP); // Eliminar un TP especifico
router.get('/api/TU/D', db.removeTU); // Eliminar un TP especifico
router.get('/api/TC/D', db.removeTC); // Eliminar un TC especifico
router.post('/api/TE/D',db.removeTE); // Eliminando un enlace especifico
router.post('/api/TA/D',db.removeTA); // Eliminando un TA especifico


module.exports = router;