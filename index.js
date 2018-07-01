const app = require('express')();
const axios = require('axios');
const moment = require('moment');
const pouchDB = require('pouchdb');
const bodyParser = require('body-parser');

let db = new pouchDB('forex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/rates', (req, res) => {
    let apiKey = '4fa8eb1a18adbb9695581f1bb870cd50';

    axios.get('http://data.fixer.io/api/latest', {
        params: {
            access_key: apiKey,
            format: 1,
            symbols: 'GBP,JPY,USD,AUD,SGD,IDR'
        }
    })
        .then(function(response){
            response.data.updated = moment.unix(response.data.timestamp).format('MMMM Do YYYY, h:mm:ss a');
            res.send(response.data);
        })
        .catch(function(error){
            res.send(error);
        });
});

app.get('/levels', (req, res) => {
    db.allDocs({
        include_docs: true
    })
        .then(function (levels) {
            let data = [];
            let result = {
                totalRows: levels.total_rows
            };

            for (let level of levels.rows) {
                data.push({
                    id: level.id,
                    currency: level.doc.currency,
                    value: level.doc.level,
                    edit: false
                });
            }

            result.results = data;

            res.send(result);
        })
        .catch(function (error) {
            res.send(error);
        });
});

app.put('/level/:id', (req, res) => {
    db.get(req.params.id).then(function (forex) {
        db.put({
            _id: forex._id,
            _rev: forex._rev,
            level: req.body.level,
            currency: req.body.currency
        })
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.send(error);
            });
    });
});

app.post('/level', (req, res) => {
    db.post({
        currency: req.body.currency,
        level: req.body.level
    })
        .then(function (response) {
            res.send(response);
        })
        .catch(function (error) {
            res.send(error);
        });
});

app.delete('/level/:id', (req, res) => {
    db.get(req.params.id).then(function(forex) {
        db.remove(forex);
    })
        .then(function () {
            res.send({
                success: true
            });
        })
        .catch(function (error) {
            res.send(error);
        });
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on ' + port);
});