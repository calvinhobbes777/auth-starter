module.exports = {
  //exporting route config object
  method: "POST", //http method used
  path: "/api/users", //request url to access this endpoint
  config: {
    //sets how the request is handled after its recieved
    //auth.mode set to optional will be accessable to all without authentication
    handler: function(request, reply) {
      //runs when a request is recieved
      let user = new this.models.User(request.payload); //creates a new user for the model

      user
        .save() //saves the new user to the db
        .then(user => reply(user)) //sends the new user to the http response
        .catch(err => reply(err)); //sends error if something goes wrong
    }
  }
};
