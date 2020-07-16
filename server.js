const express = require("express");
const session = require("express-session");
var db = require("./models");

const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   session({
//     secret: "thisisaverysecretsecret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("client/public"));
}

app.use("/", routes);
app.get("*", function (req, res) {
  console.log(" * route hit");
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
