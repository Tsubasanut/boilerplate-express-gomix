let express = require("express");
let app = express();

//let's connect cuurent env via dotenv module
require("dotenv").config();

//serving static files
app.use("/public", express.static(__dirname + "/public"));
//mounting logger for all calls
app.use(logCalls);

//main
app.get("/", returnSomething);
app.get("/json", returnJson);
app.get("/now", middleTime, returnTime);

function returnSomething(req, res) {
  //console.log(`running respose ${res} for request ${req}`)
  //res.send("Hello Express");
  //console.log(`sending file from ${__dirname}`);
  //console.log("test process.env", process.env);
  res.sendFile(__dirname + "/views/index.html");
}

function returnJson(req, res) {
  let msgTxt =
    process.env.MESSAGE_STYLE == "uppercase"
      ? "Hello json".toUpperCase()
      : "Hello json";

  const testObj = {
    message: msgTxt,
  };
  res.json(testObj);
}

function logCalls(req, res, next) {
  console.log("%s %s - %s", req.method, req.path, req.ip);
  next();
}

function middleTime(req, res, next) {
  req.time = new Date().toString();
  next();
}

function returnTime(req, res) {
  const dateObj = {
    date: req.time,
  };
  res.json(dateObj);
}

module.exports = app;
