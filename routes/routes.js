const http = require("http");
const apiKey="6fcb8550953fd4f6a72cf68a751b998f"
const data=[];
const store = require("localStorage")

var appRouter = function (app) {
    
    app.get("/currency", function(req, res) {
        http.get("http://data.fixer.io/api/latest?access_key="+apiKey, (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            res.status(200).json(data);

          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

    });
      
    app.get('/level', function (req, res) {
        
        res.send(req.body);
    });
    
    app.post('/update', function (req, res) {
        console.log('updating: ' + JSON.stringify(req.body));
        res.send(req.body);
    });
    
    app.post('/delete', function (req, res) {
        console.log('deleting : ' + JSON.stringify(req.body));
        res.send(req.body);
    });
    
    app.post('/save', function (req, res) {
        var param=JSON.stringify(req.body)
        data.push(data)
        store.setItem('level',data)
        
        console.log('body: ' + JSON.stringify(req.body));
        res.send(req.body);
    });

}

module.exports = appRouter;