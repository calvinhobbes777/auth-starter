const thinky = require("thinky"); //requireing thinky to set up a db connection

const db = thinky({
  //building/configuring a connection then turns it on
  db: "firstAuthApi"
});

let User = require("./user")(db); //gets the user model function and passing the db in

module.exports = {
  //exporting the models as properties of the module
  User: User
};
