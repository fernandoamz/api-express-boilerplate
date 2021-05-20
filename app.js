const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const oauth = require('./modules/oauth');
const dotenv = require('dotenv').config();

const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

const csrfMiddleware = csrf({
  cookie: {
    httpOnly: true,
    maxAge: 3600,
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

const sqlPool = require('./modules/sqlPool');
global.sqlPool = sqlPool;

const {
  $MYSQL_ROOT_USER,
  $MYSQL_ROOT_PASSWORD,
  $MYSQL_HOST,
  $MYSQL_DATABASE,
} = process.env;

global.conn = {
	user: $MYSQL_ROOT_USER,
	password: $MYSQL_ROOT_PASSWORD,
	server: $MYSQL_HOST,
	database: $MYSQL_DATABASE,
	options: {
		encrypt: true 
	}
};


global.jwtSecret = 'secret';
global.jwtExpiresIn = 15 * 24 * 3600;

app.use(oauth.errorHandler());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
