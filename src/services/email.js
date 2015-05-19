var Bluebird      = require('bluebird');

exports.register = function (server, options, next) {

  var mandrill         = require('mandrill-api/mandrill');
  var mandrill_client  = new mandrill.Mandrill(server.plugins.config.mandrill_api_key);

  var send = function (message) {
    return new Bluebird(function (resolve, reject) {
      mandrill_client.messages.send({
        message: message,
        async: false
      }, function (result) {
        return resolve(result);
      }, function (e) {
        return reject(e);
      });
    });
  };

  var buildEmailMessage = function (toAddress) {
    var msg = '<p>Hey ' + toAddress.name + ',</p>';
    msg += '<p>We are happy you have decided to user our service. ';
    msg += 'An address verification postcard has been sent to:</p>';
    msg += '<p>' + toAddress.name + '</p>';
    msg += '<p>' + toAddress.address_line1 + '</p>';
    msg += '<p>' + toAddress.address_city + ', ';
    msg += toAddress.address_state + ', ';
    msg += toAddress.address_zip + '</p>';
    msg += '<p>When you receive the postcard, follow the instruction on the card to verify your home address</p>';
    msg += '<p>-- The Team</p>';
    return msg;
  }

  var sendEmail = function sendEmail (fromAddress, toAddress) {

    var message = {
        'html': buildEmailMessage(toAddress),
        'subject': 'Welcome to the Club!',
        'from_email': fromAddress.email,
        'from_name': fromAddress.name,
        'to': [{
                'email': toAddress.email,
                'name': toAddress.name,
                'type': 'to'
            }],
        };

    return send(message);
  }

  server.expose('sendEmail', sendEmail);
  next();
};

exports.register.attributes = {
  name: 'email',
};
