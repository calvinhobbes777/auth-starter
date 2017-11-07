module.exports = db => {
  //model exported as function db passed in as param
  let User = db.createModel("User", {
    //creating a model for the user
    //db model is a definition of a particular data
    //takes in 3 params (modelname,modelschema,modeloptions"optional")
    email: db.type.string().required(),
    password: db.type.string().required()
  });

  return User; //returns the model from the function
};
