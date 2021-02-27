// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const connection = require("./config/connection");

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
app.get("/", (req, res) => {
  connection.query("SELECT * FROM `recipes`", (err, results) => {
    if (err) {
      throw err;
    }
    res.render("home", { data: results });
    console.log({ data: results });
  });
});

app.get("/recipe/:id", (req, res) => {
  connection.query("SELECT * FROM `recipes` WHERE id = ``", (err, results) => {
    if (err) {
      throw err;
    }
    res.render("recipe", { data: results });
    console.log({ data: results });
  });
});

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
