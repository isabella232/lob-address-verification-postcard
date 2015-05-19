# Lob Address Verification Postcard Example
Node.js application using Lob, Hapi, and Mandrill to create a user registration form that will send an address validation postcard to a user when the register.

## Pre Reqs
You will need to register for a Lob and Mandrill API key before you can run the project. Once you have your API keys, open up the `src/services/config/development.json` file and paste them into the appropriate field.

#### Lob API Key
Sign up here:
https://dashboard.lob.com/#/register

#### Mandrill API key
Sign up here:
https://www.mandrill.com/signup/


## Install Packages Globally
```
npm i nodemon -g
```

## Install Project Dependancies
`cd` into your project directory and run:

```
npm i
```

## Start Server
```
nodemon
```

Your project should be running at http://localhost:3000
