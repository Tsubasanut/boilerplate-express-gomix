let express = require("express");
let app = express();

app.get("/", returnHello);

function returnHello(req, res) {
  //console.log(`running respose ${res} for request ${req}`)
  res.send("Hello Express");
}

module.exports = app;
