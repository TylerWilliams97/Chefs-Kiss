// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const cloudinary = require("./upload/index.js");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(
  fileUpload({
    useTempFiles: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudAPI,
  api_secret: process.env.cloudSecret,
});

app.get("/upload", req => {
  // const file = req.files.upload;
  // console.log(file);
  cloudinary.uploader.upload("./images/placeholder.png", (err, results) => {
    console.log("Error", err);
    console.log("Results:", results);
  });
});

// Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
