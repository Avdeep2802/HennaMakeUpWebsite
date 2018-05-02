/**
 * http://usejsdoc.org/
 */

exports.showUser= function(req, res){
    var uname = req.params.username;
    var db = req.db;
    var collection = db.get('usercollection');
    
    collection.find( { username : uname }, 
                     function(err, doc) 
                     {
                         if (err) {
                             res.send("Find failed.");
                         }
                         else {
                             res.render('showuser', 
                                        { title: 'Show User: ' + uname,
                                          mail: doc[0].email })
                         }
                     });
};