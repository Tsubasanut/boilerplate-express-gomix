let express = require("express");
let body_parser = require("body-parser");
let app = express();

//let's connect cuurent env via dotenv module
require("dotenv").config();

//serving static files
app.use("/public", express.static(__dirname + "/public"));
//mounting logger for all calls
app.use(logCalls);
/*
If the data was sent using Content-Type: application/x-www-form-urlencoded,
you will need to use the express.urlencoded() middleware: 

app.use(
  express.urlencoded({
    extended: true,
  })
);
*/

//mounting parsing for POST
app.use(body_parser.urlencoded({ extended: false }));

//main
app.get("/", returnSomething);
app.get("/json", returnJson);
app.get("/now", middleTime, returnTime);
app.get("/:word/echo", returnEcho);
app.route("/name").get(returnName).post(processNamePost);

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
    time: req.time,
  };
  res.send(dateObj);
}

function returnEcho(req, res) {
  res.json({
    echo: req.params.word,
  });
}

function processNamePost(req, res) {
  //loggin incoming query
  console.log("posting query: %s", req.query);
}

function returnName(req, res) {
  returnObj = {
    name: `${req.query.first} ${req.query.last}`,
  };
  res.json(returnObj);
}

module.exports = app;
