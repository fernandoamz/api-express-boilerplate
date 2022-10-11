
var mysql = require('mysql2');

var sqlPool  = mysql.createPool({
    multipleStatements: true,
    connectionLimit : 100,
    user: "root",
	password: "root",
	host: "mysql-app-instance",
	database: "oauth_server",
});

module.exports = sqlPool;
