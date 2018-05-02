/**
 * http://usejsdoc.org/
 */
var db = require('../db');

exports.getallusers = function(req, res){
    
    var collection = db.get('usercollection');
    collection.find({}, {}, 
                    function(e, docs)
                    {
                        res.render('userlist', { "userlist" : docs });
                    });
};