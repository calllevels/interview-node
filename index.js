const app = require("express")();


var bodyParser = require("body-parser");
var cors = require('cors');
var routes = require("./routes/routes.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enables cors
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

app.get("/", function(req, res) {
    res.status(200).sendFile(__dirname + "/index.html")
    
});

routes(app);


var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on " + port);
});

