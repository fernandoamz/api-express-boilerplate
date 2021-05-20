var express = require('express');
var oauth = require('../modules/oauth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', oauth.authorise(), function(req, res, next) {
  res.send('Wilson Wu is a Software Architect!');
});

router.get('/profile/mysql', oauth.authorise(), function(req, res, next) {
  console.log(global.sqlPool);
  global.sqlPool.getConnection(function (err, connection) {
		let sqlGetToken = "select * from tasks";

		connection.query(sqlGetToken, function (error, results, fields) {
    connection.release();
	
      if (!error) {
        res.json({
          status: 'ok',
          result: results,
        })
      } else {
        res.json({
          status: 'naahh'
        })      
			}
		});
	});
});

module.exports = router;
