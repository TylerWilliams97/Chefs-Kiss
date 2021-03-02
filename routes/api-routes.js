// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
//const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/members/post", (req, res) => {
    //sequlize create table and logs results
    // recipe_name , ingredients, description
    db.Recipe.create({
      recipeName: req.body.recipeName,
      ingredients: req.body.ingredients,
      description: req.body.description,
      instructions: req.body.instructions,
      cloudLink: req.body.cloudLink
    }).then(results => {
      res.json(results);
      console.log(results);
    });
  });
  //get request to post recipes
  app.get("/api/recipes/post", (req, res) => {
    db.Recipe.findAll({}).then(result => {
      console.log(result);
      res.json(result);
    });
  });
  //request to delete selcetion by id
  app.delete("/api/recipes/:id", req => {
    const id = req.params.id;
    db.Recipe.destroy({
      where: { id }
    }).then(deletedRecipe => deletedRecipe);
  });
  //get request to return info to recipe page
  app.get("/recipe/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.Recipe.findOne({
      where: {
        id: req.params.id
      },
      raw: true
    }).then(data => {
      console.log(data);
      res.render("recipe", data);
    });
  });
  //get request to render main page
  app.get("/", (req, res) => {
    db.Recipe.findAll({ raw: true }).then(data => {
      res.render("home", { data: data });
      console.log(data);
    });
  });
};
//MOVED IMAGE POST ROUTE ~STILL NOT WORKING~
//posting images to cloudinary and saving to database
// recipeForm.addEventListener("submit", recipeFormSubmit);
// fileUpload.addEventListener("change", event => {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//   axios({
//     url: CLOUDINARY_URL,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     data: formData
//   })
//     .then(res => {
//       console.log(res);
//       //const link = res.data.url;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
