const bcrypt = require("bcrypt-as-promised"); //require so that we can secure our password with encrypted value
const jwt = require("jsonwebtoken");

module.exports = db => {
  //model exported as function db passed in as param
  let User = db.createModel("User", {
    //creating a model for the user
    //db model is a definition of a particular data
    //takes in 3 params (modelname,modelschema,modeloptions"optional")
    email: db.type.string().required(),
    password: db.type.string().required()
  });
  //define a method to call on all docs that will transform the password value and make it safe to store in db
  User.define("generatePassword", function() {
    //generate salt, generate hash with input password/salt, update with hash as password value
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => Object.assign(this, { password: hash }))
      .catch(error => reply(error));
  });
  //define a method that can be called on all docs takes the password sent and compares it to the one stored
  User.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password) //compare the plain password to hashed password
      .then(authed => (authed ? this : false)) //return "this" or user doc if auth is true else false
      .catch(error => reply(error));
  });
  //defines a method that transforms the data to a secure token to our api
  User.define("generateJWT", function(user) {
    //call jwt.sign(data,key,optionsObject) returns large encoded string
    return jwt.sign(Object.assign({}, this), "supersecretsecret", {
      algorithm: "HS256"
    });
  });

  //define a event hook to call any methods needed to run before a newuser doc is saved to db
  User.pre("save", function(next) {
    //execute generate password on doc then cont to allow saving catch the error and stop it from saving
    User.filter({ email: this.email }).then(users => {
      //check if duplicate emails exist
      if (users.length > 0) {
        throw next("email/password combo invalid");
      } else {
        return this.generatePassword()
          .then(() => next())
          .catch(error => next(error));
      }
    });
  });

  return User; //returns the model from the function
};
