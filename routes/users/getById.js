module.exports = {
  //exporting route config object

  method: "GET", //http method used
  path: "/api/users/{userId}", //request url to access this endpoint
  config: {
    //sets how the request is handled after its recieved
    //auth.mode set to optional will be accessable to all without authentication
    handler: function(request, reply) {
      //runs when a request is recieved
      let userId = request.params.userId; //sets the id to the params from the url

      this.models.User
        .get(userId) //fetches the user by the id found in the url
        .then(result => reply(result)) //sends the user found
        .catch(err => reply(err)); //sends the error if something happens
    }
  }
};
