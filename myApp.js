let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", returnSomething);
app.get("/json", returnJson);

function returnSomething(req, res) {
  //console.log(`running respose ${res} for request ${req}`)
  //res.send("Hello Express");
  //console.log(`sending file from ${__dirname}`);
  res.sendFile(__dirname + "/views/index.html");
}

function returnJson(req, res) {
  const testObj = {
    message: "Hello json",
  };
  res.json(testObj);
}

module.exports = app;
