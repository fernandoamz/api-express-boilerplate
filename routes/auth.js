var express = require('express');
var oauth = require('../modules/oauth');

var router = express.Router();

router.all('/token', oauth.grant());

router.get('/csrf-token', (req, res) => {   
  res.json({ csrfToken: req.csrfToken() }); 
}); 

module.exports = router;
