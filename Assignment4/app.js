
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var adduser = require('./routes/adduser');
var deleteUser = require('./routes/deleteUser');
var getAllUsers = require('./routes/getAllUsers');
var showUser = require('./routes/showuser');
var updateUser = require('./routes/updateUser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(req, res, next)
		{
		    req.db = db;
		    next();
		});

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/adduser',adduser.adduser);
app.get('/userlist', getAllUsers.getallusers);
app.get('/userlist/:username', showUser.showUser);
app.get('/deleteuser/:username', deleteUser.deleteUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
