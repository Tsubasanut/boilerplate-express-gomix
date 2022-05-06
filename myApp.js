let express = require("express");
let app = express();

app.get("/", returnSomething);

function returnSomething(req, res) {
  //console.log(`running respose ${res} for request ${req}`)
  //res.send("Hello Express");
  console.log(`sending file from ${__dirname}`);
  res.sendFile(__dirname + "/views/index.html");
}

module.exports = app;
