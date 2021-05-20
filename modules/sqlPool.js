
var mysql = require('mysql');
const {
    MYSQL_ROOT_USER,
    MYSQL_ROOT_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_HOST,
} =  process.env;

var sqlPool  = mysql.createPool({
    multipleStatements: true,
    connectionLimit : 100,
    host            : MYSQL_HOST,
    user            : MYSQL_ROOT_USER,
    password        : MYSQL_ROOT_PASSWORD,
    database        : MYSQL_DATABASE,
});

module.exports = sqlPool;
