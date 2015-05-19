var randomstring  = require("randomstring");

exports.register = function (server, options, next) {

  var Lob = require('lob')(server.plugins.config.lob_api_key);

  var verifyAddress = function (payload) {
    return Lob.verification.verify({
      address_line1: payload.address,
      address_city: payload.city,
      address_state: payload.state,
      address_zip: payload.zip,
      address_country: 'US',
    });
  }

  var createAddress = function (payload , verifiedAddress) {
    return Lob.addresses.create({
      description: 'User ' + payload.name + '\'s Address',
      name: payload.name,
      email: payload.email,
      address_line1: verifiedAddress.address_line1,
      address_city: verifiedAddress.address_city,
      address_state: verifiedAddress.address_state,
      address_zip: verifiedAddress.address_zip,
      address_country: verifiedAddress.address_country
    });
  }

  var createPostcard = function (toAddress, postcardFront) {
    return Lob.postcards.create({
      description: 'Registration Postcard for ' + toAddress.name,
      to: toAddress.id,
      from: server.plugins.config.fromAddress,
      front: postcardFront,
      message: 'Welcome to the club!',
      data: {
        activate_code: randomstring.generate(5)
      }
    });
  }


  server.expose('createPostcard', createPostcard);
  server.expose('createAddress', createAddress);
  server.expose('verifyAddress', verifyAddress);

  next();
};

exports.register.attributes = {
  name: 'lob',
};
