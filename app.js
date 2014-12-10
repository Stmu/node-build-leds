var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var leds = require('rpi-ws2801');
var config = require('./config/config');

var app = express();
 
configureConnectedLeds(leds, config.leds);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function configureConnectedLeds(leds, ledConfig){
    leds.connect(ledConfig.numLeds, ledConfig.spiDevice);
    leds.setColorIndex(ledConfig.colorIndex.red, ledConfig.colorIndex.green, ledConfig.colorIndex.blue);
}

module.exports = app;

function shutdown() {
    console.log("disconnect leds")
    
    leds.clear();
    leds.disconnect();

    process.exit();
}

process.on('SIGINT', shutdown);