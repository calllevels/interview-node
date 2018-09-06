const app = require("express")();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const http = require("http");
var bodyParser = require("body-parser");
const adapter = new FileSync("db.json");
const db = low(adapter);
var cors = require("cors");

//No 'Access-Control-Allow-Origin'
app.use(cors());

db.defaults({ currencies: [] }).write();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hi you can set forex levels with me!");
});

//Helper Methods
function resetDB() {
  db.get("currencies")
    .remove()
    .write();
}
// method to populate the db -- Should be customized later
app.post("/PopulateDB", function(req, res) {
  http
    .get(
      "http://api.exchangeratesapi.io/latest?symbols=" +
        req.body.activeCurrencies,
      resp => {
        let data = "";
        resp.on("data", chunk => {
          data += chunk;
        });
        resp.on("end", () => {
          resetDB();
          var parsed = JSON.parse(data);
          var mapper = new Map(Object.entries(parsed.rates));
          mapper.forEach((element, key) => {
            db.get("currencies")
              .push({ currency: key, value: element })
              .write();
          });
          res.status(200).json(db.get("currencies").value());
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

// returns the data from the local database
app.get("/Currencies", function(req, res) {
  res.status(200).json(db.get("currencies").value());
});

// add a new currency to the local database
app.post("/Currencies/", function(req, res) {});

// update currencie value to the database
app.put("/Currencies/", function(req, res) {});

// method to add alert to currency
app.put("/Currencies/setAlert", function(req, res) {});

// method to remove alert from currency
app.put("/Currencies/removeAlert", function(req, res) {});

// method delete a currency from the local db
app.delete("/Currencies", function(req, res) {});
var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on " + port);
});
