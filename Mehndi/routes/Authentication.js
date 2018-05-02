var mysql = require('mysql');
var session = require('express-session');
var passport = require('passport');
const bcrypt = require('bcrypt');
var expressValidator = require('express-validator');
global.sessData ; 
var db = require('../db');


exports.signup = function(req, res){
	
	console.log(req.body.userid);
	global.sessData = req.session;
	var cookies = req.cookies;
	var userid = req.body.userid;
	var pwd = req.body.password;	
	req.check('userid',"Invalid email address!").isEmail();	
	req.check('password',"password is required!").notEmpty();	
	req.check('re_password',"passwords do not match!").equals(req.body.password);	
	var errors = req.validationErrors();
	if(errors){
		res.render('index',{title:'', errors:errors, session:global.sessData.userid});
	}else{
		bcrypt.hash(pwd, 10, function(err, hash) {
			db.query('SELECT * FROM login where userid =?',userid, function(err, rows, fields){
		    	if(err){
					console.log("error while performing query");
				}   
		    	if (rows.length == 0){
		    		db.query("insert into login (userid, password) VALUES (?,?)", [userid, hash], function(err,result){
						if(err){
							console.log("unable to insert "+ hash);
							console.log(err);
							return;
						}else{
							global.sessData.userid = userid;
							res.redirect('home',{title:'',errors:errors, session:global.sessData.userid});
						}				
					});	
				}else{
					res.render('index',{title:'Userid already exists! try again with different userid',errors:errors, session:''});
				}
		    	
		    	
		    });
		});
	}
	
	
}




exports.login = function(req, res){	
	global.sessData = req.session;
	var cookies = req.cookies;
	var userid = req.body.userid;
	console.log(userid);
	var password = req.body.password;
	var errors = req.validationErrors();
	db.query('SELECT * FROM login where userid =?',userid, function(err, rows, fields){
		if(err){
				console.log("error while performing query");
			}
		if (rows.length == 0){
			console.log("i am inside");
				res.render('index',{title : "Invalid Email Id",errors: errors, session:global.sessData.userid} );
			}else{	
				bcrypt.compare(password, rows[0].password, function(err, resp) {
					  if(resp == true) {
						  const uid = rows[0].userid;
						  req.login(uid,function(err){
							 if(err){
								 console.log(err)
							 }
						  });
						  console.log("!!!!!!!! : "+ global.sessData);
						  global.sessData.userid = userid;
						  res.cookie('userid', userid, { maxAge: 2592000000 });
						  res.render('home',{title : "Successfully logged In",errors: errors, session:global.sessData.userid} );
					  }else{
						  res.render('index',{title : "Invalid Password",errors: errors, session:global.sessData.userid} );
					  } 
					});																										
			}
	});
};



exports.logout = function(req, res){
	console.log(global.sessData.userid  + " : before");
	req.session.destroy();
	global.sessData.userid = "";
	console.log(global.sessData.userid+ " : after");

	res.render('index', {title:"Successfully logged out",errors:'', session:global.sessData.userid});
};


passport.serializeUser(function(uid, done){
	done(null, uid);
});

passport.deserializeUser(function(uid, done){
	done(null, uid);
});

