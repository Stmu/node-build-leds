var routes = require('../app/controller/index');
var users = require('../app/controller/users');
var api = require('../app/controller/api');

module.exports = function(app) {
    "use strict";

    app.get('/', routes);

    app.post('/api/demo', api.demo);
    app.use('/api/', api.index);

    app.use('/users', users);
}