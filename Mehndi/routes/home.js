/**
 * http://usejsdoc.org/
 */

exports.home = function(req, res){
	console.log("I am here");
	 res.render('home');
}