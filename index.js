const hapi = require("hapi"); //requiring hapi to set up server
const api = require("./api"); //requiring api to register api endpoints
const hapiAuthJwt = require("hapi-auth-jwt2");

const server = new hapi.Server(); //building a new server

server.connection({
  //setting up server connection
  host: "localhost", //at localhost
  port: 4040, //with the port of 4040
  routes: {
    cors: true //allows requests between clients and servers unless its false
  },
  router: {
    stripTrailingSlash: true //strips the last slash off the request url
  }
});

server
  .register([
    hapiAuthJwt,
    //takes plugins as an array and executes each
    {
      register: api //snippet of code that modifies the server settings usually pre built
    }
  ])
  .then(() => {
    server //turning the server on making the api reachable
      .start()
      .then(() => console.log(`Server started at: ${server.info.uri}`))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
