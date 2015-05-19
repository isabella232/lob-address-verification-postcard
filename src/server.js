'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();

server.register([
  require('./services/config'),
  require('./services/lob'),
  require('./services/email')
], function (err) {
  if (err) {
    throw err;
  }
});

server.connection({
    port: server.plugins.config.port,
    labels: ['http']
});

server.views({
  engines: {
    hbs: require('handlebars')
  },
  relativeTo: __dirname,
  path: './views',
  layoutPath: './views/layouts',
  layout: 'defaultLayout'
});

server.register([
  require('./plugins/lob-registration-postcard')
], function (err) {
  if (err) {
    throw err;
  }
});

server.start();
console.log('Server Started on:', server.info.uri);
