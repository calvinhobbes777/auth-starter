module.exports = {
  method: "POST", //http method used
  path: "/api/users/login", //request url to access this endpoint
  config: {
    //sets how the request is handled after its recieved
    //auth.mode set to optional will be accessable to all without authentication
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      //runs when a request is recieved
      reply("not implemented");
    }
  }
};
