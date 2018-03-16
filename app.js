var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();
var port = 9527;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ql");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
});

var User = mongoose.model("User", nameSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/addname',(req, res) => {
    console.log(req);
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.listen(port, () => {
    console.log('start');
});