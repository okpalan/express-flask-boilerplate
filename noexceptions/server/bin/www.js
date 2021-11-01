
   
const app = require("../");
const https = require("https");
const fs = require("fs");
const path = require("path");


const PATH2JOIN = path.join("server", "config", "ssl");
const options = {
  https: {
    cert: fs.readFileSync(path.join(PATH2JOIN, "cert.pem")).toString(),
    key: fs.readFileSync(path.resolve(PATH2JOIN, "key.pem")).toString(),
    ca: fs.readFileSync(path.resolve(PATH2JOIN, "certreq.csr")).toString(),
  },
};

https
  .createServer(options.https, app)
  .listen(app.get("PORT"), () => console.log(`Head to: ${app.get("URL")}`));