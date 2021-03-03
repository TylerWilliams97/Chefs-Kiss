// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
require("dotenv").config();
//const connection = require("./config/connection");

//Create instance of express app
const app = express();
//set PORT
const PORT = process.env.PORT || 8080;
const db = require("./models");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set HandleBars as default Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
