

var LocalStrategy = require('passport-local').Strategy;

var server = require('../public/javascripts/server');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	passport.use('local-login',new LocalStrategy({
		usernameField : 'username',
        passwordField : 'password',
		passReqToCallback: true
	}, function(req, email, password, done){
	
		req.session.usr = email;
		req.session.pass = password;
		
		server.getUSR({TU_1:email})
		.then(function(data){
			if(data.length === 0) // si no existe el usuario
			{
				req.session.retry = true;
				return done(null,false, email);
			}
			else
			{
				var usr = data[0];
				console.log("Se ha recuperado el usuario");
				if(usr.tu_2 === password) // si el usuario es correcto
				{
					console.log("El usuario si existe...");
					req.session.usuario = {
						nombre: usr.tp_1,
						apellido: usr.tp_2,
						tipo: usr.tu_3,
						Id: usr.tu_1
					};
					return done(null, email);
				}
				else
				{
					req.session.retry = true;
					return done(null,false, email);
				}
				console.log(usr);
			}
		});
		//return done(null, email);
		//return done(null,false, email);
	}
		));
};