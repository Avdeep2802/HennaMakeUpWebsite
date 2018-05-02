var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'mehndi'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;