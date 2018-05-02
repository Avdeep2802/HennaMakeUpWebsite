/**
 * http://usejsdoc.org/
 */

exports.deleteUser = function(req, res){
	{
	    var uname = req.params.username;
	    var db = req.db;
	    var collection = db.get('usercollection');

	    // Submit to the database.
	    collection.remove( { "username" : uname },
	                       function (err, doc) 
	                       {
	                           if (err) {
	                               res.send("Delete failed.");
	                           }
	                           else {
	                               res.send("Successfully deleted " + uname);
	                           }
	                       });
	};
}