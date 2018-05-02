/**
 * http://usejsdoc.org/

 */
var db = require('../db');

exports.adduser = function(req, res){
    // Set our internal DB variable


    // Get our form values. These rely on the "name" attributes.
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection.
    var collection = db.get('usercollection');

    // Submit to the database.
    collection.insert( { "username" : userName,
                         "email" : userEmail },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Insert failed.");
                           }
                           else {
                               // Forward to success page
                               //res.redirect("userlist");
                        	   console.log("added");
                           }
                       });
};


