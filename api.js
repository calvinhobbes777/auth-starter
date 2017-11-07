const models = require("./models"); //requiring models from its folder
const routes = require("./routes"); //requiring routes from its folder

module.exports.register = (server, options, next) => {
  //hapi plugins require a register export  will receive a function
  //server - the server instance the plugin was registered too
  //options - any options the server has already been configured with

  server.bind({
    //takes all props from the object passed in
    models: models
  }); //adds them to the server when inside a handler so user this.models instead of server.models

  server.route(routes); //adds each route as an api endpoint

  next(); //next - a function that will move to execute the next plugin in the array
};

module.exports.register.attributes = {
  //hapi plugins required to provide attributes
  name: "api", //like name and version so they dont get duplicated
  version: "0.0.1"
};
