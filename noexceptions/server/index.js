const path = require("path");
const yenv = require("yenv");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpError = require("http-errors");

const env = yenv(path.join("server", "/config", "web.yaml"), { strict: false });
const app = express();

app.set("PORT", env.PORT);
app.set("HOST", env.HOST);
app.set("LOGGER", env.LOGGER);
app.set("URL", `https://${app.get("HOST")}:${app.get("PORT")}` || env.URL);

const whitelist = [app.get("URL")],
 corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//add middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger(app.get("LOGGER")));
app.use(cors(corsOptions));

// set the view-engine and directory
app.use("/", express.static(path.join("public")));
app.get("*", function (req, res) {
  res.redirect("https://" + req.headers.host + req.url);
});

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

module.exports = app;