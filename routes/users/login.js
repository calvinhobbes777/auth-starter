module.exports = {
  method: "POST", //http method used
  path: "/api/users/login", //request url to access this endpoint
  config: {
    //sets how the request is handled after its recieved
    //auth.mode set to optional will be accessable to all without authentication
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      //runs when a request is recieved
      let { email, password } = request.payload; //grab the email/password values from request.payload

      this.models.User
        .filter({ email: email }) //filter users by login email
        .then(users => {
          if (users.length === 0) {
            throw "email/password combo invalid"; //no users with email throw error
          } else {
            let [user] = users; //grab the user at first index of array
            return user.comparePassword(password); //run with comparedPassword
          }
        })
        .then(user => {
          if (!user) {
            //if user is false throw the error
            throw "email/password combo invalid";
          } else {
            delete user.password; //remove password efore generating jwt
            return user.generateJWT(); //if not return and generate a jwt
          }
        })
        .then(token => reply(token))
        .catch(error => reply(error));
    }
  }
};
