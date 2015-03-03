var routes = require('../app/controller/index');
var users = require('../app/controller/users');
var api = require('../app/controller/api');

module.exports = function(app) {
    "use strict";

    app.get('/', routes);

    // api requests
    app.post('/api/demo', api.demo);
    app.post('/api/fill', api.fill);
    app.post('/api/range', api.range);

    app.get('/led/:led/fill/:color', api.ledFill);
    app.get('/led/from/:start/to/:end/fill/:color', api.fillRange);

    // simple call fill all with on color
    app.get('/api/red', api.red);
    app.get('/api/green', api.green);
    app.get('/api/black', api.black);
    app.get('/api/yellow', api.yellow);
    app.get('/api/blue', api.blue);
    app.get('/api/hotpink', api.hotpink);
    app.get('/api/orange', api.orange);

    app.use('/api/', api.index);

    app.use('/users', users);
}
