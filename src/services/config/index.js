'use strict';

exports.register = function (server, options, next) {
  server.expose(require('./development.json'));
  next();
};

exports.register.attributes = {
  name: 'config',
  version: '1.0.0'
};
