const app = require("../");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const io = require("socket.io")(https, {
  origins: [app.get("URL"), app.get("DOMAIN_URL")],
});

io.on("connection", function (socket) {
  console.log("A user connected");

  // Send a message after a timeout of 4seconds
  setTimeout(function () {
    socket.send("Sent a message 4seconds after connection!");
  }, 4000);
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

const PATH2JOIN = path.join("config", "ssl");
const options = {
  https: {
    cert: fs.readFileSync(path.resolve(PATH2JOIN, "cert.pem")).toString(),
    key: fs.readFileSync(path.resolve(PATH2JOIN, "key.pem")).toString(),
    ca: fs.readFileSync(path.resolve(PATH2JOIN, "certreq.csr")).toString(),
  },
};

const server = https
  .createServer(options.https, app)
  .listen(app.get("PORT"), () => console.log(`Head to: ${app.get("URL")}`));
