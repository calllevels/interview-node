const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const path = require("path");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync('db.json');
const db = low(adapter);

//parsing body from http request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
//serving static files
app.use('/public',express.static(__dirname + '/public/js'));
app.use('/public',express.static(__dirname + '/public/css'));
app.use('/public',express.static(__dirname + '/public/css/vendor'));

app.use('/fonts',express.static(__dirname + '/public/fonts'));
app.use('/vendor/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/vendor/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/vendor/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//serving html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

//web service for CRUD operation
db.then(db =>{
    app.get('/api/levels',(req,res)=>{
        const post = db.get('posts')
        res.json({status:200,data:post});
     })
 
     app.get('/api/levels/count',(req,res)=>{
        const totalLevels = db.get('posts')
                               .size()
                               .value();
                             
       res.json({status:200,data:totalLevels});
    })

     app.get('/api/levels/:id',(req,res)=>{
        const post = db.get('posts')
            .find({ id: req.params.id })
            .value()
        res.json({status:200,data:post});
       
     })

    
     
     app.post('/api/levels',(req,res)=>{
      
        db.get('posts')
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(post =>  res.json({status:200,data:post}))
        
     })
     
     app.put('/api/levels/:id',(req,res)=>{
       
        db.get('posts')
        .find({ id: req.params.id })
        .assign(req.body)
        .write()
        .then(post =>  res.json({status:200,data:post}))
     })
     
     app.delete('/api/levels/:id',(req,res)=>{
        db.get('posts')
        .remove({ id: req.params.id })
        .write();

        res.json({status:200,data:req.params.id});
     })
})






var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on " + port);
});