/**
 * http://usejsdoc.org/
 */


exports.updateUser = function(req, res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes.
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection.
    var collection = db.get('usercollection');

    // Submit to the database.
    collection.update( {"username" : userName},
                         {$set: {"email" : userEmail }},
                       function (err, doc)
                       {
                           if (err) {
                               res.send("Update failed.");
                           }
                           else {
                               // Forward to success page
                               res.redirect("userlist");
                           }
                       });
};