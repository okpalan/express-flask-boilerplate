const app = require("../");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const PATH2JOIN = path.join("config", "ssl");
const options = {
  https: {
    cert: fs.readFileSync(path.resolve(PATH2JOIN, "cert.pem")).toString(),
    key: fs.readFileSync(path.resolve(PATH2JOIN, "key.pem")).toString(),
    ca: fs.readFileSync(path.resolve(PATH2JOIN, "certreq.csr")).toString(),
    requestCert: true,
    rejectUnauthorized: false,
  },
};

const io = require("socket.io")(https, {
  origins: [app.get("URL"), app.get("DOMAIN_URL")],
  ...options.https,
}).listen(app.get("PORT"));

io.on("connection", function (socket) {
  console.log("A user connected");

  // Send a message after a timeout of 4seconds
  setTimeout(function () {
    socket.send("Sent a message 4seconds after connection!");
  }, 1000);
});

const server = https
  .createServer(options.https, app)
  .listen(app.get("DOMAIN_PORT"), () =>
    console.log(`Head to: ${app.get("DOMAIN_URL")}`)
  );
