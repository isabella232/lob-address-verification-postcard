'use strict';

var Bluebird      = require('bluebird');
var readFile      = Bluebird.promisify(require('fs').readFile);

exports.register = function (server, options, next) {

  var Lob = server.plugins.lob;
  var Email = server.plugins.email;

  server.route([{

    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply.view('lob-registration-postcard/home');
      }
    }
  },{

    method: 'POST',
    path: '/',
    config: {
      handler: function (request, reply) {
        readFile( __dirname + '/postcard_template.html', 'utf8')
        .bind({})
        .then(function (templateFile) {
          this.postcardFront = templateFile;
          return Lob.verifyAddress(request.payload)
        })
        .then(function (verifiedAddress) {
          return Lob.createAddress(request.payload, verifiedAddress.address);
        })
        .then(function (toAddress) {
          this.toAddress = toAddress;
          return Lob.createPostcard(this.toAddress, this.postcardFront);
        })
        .then(function (postcard) {
          this.postcard = postcard;
          return Email.sendEmail(
            server.plugins.config.fromAddress,
            this.toAddress
          );
        })
        .then(function (mail) {
          reply.view('lob-registration-postcard/success');
        })
        .catch(function (error) {
          reply(error);
        });
      }
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'index',
};
