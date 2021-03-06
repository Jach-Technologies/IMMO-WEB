var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('cookie-session');

/*ROUTE DE L'ACCUEIL*/
var indexRouter = require('./routes/index');

/*ROUTE POINTANT VERS LE PROFILE DU USER*/
var profileRouter = require('./routes/profile');
var apiRouter = require('./routes/api');
var immoRouter = require('./routes/immo');
var aproposRouter = require('./routes/apropos');
var contratRouter = require('./routes/contrat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "frdrcpeterAppImmo"
}))

/*UTILISATION DE LA ROUTE ACCUEIL*/
app.use('/', indexRouter);

/*UTILISATION DE LA ROUTE DU PROFILE*/
app.use('/profile', profileRouter);
app.use('/api', apiRouter);
app.use('/immo', immoRouter);
app.use('/apropos', aproposRouter);
app.use('/contrat', contratRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
