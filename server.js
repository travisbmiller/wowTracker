var express = require("express");
var app = express()
var port = 9001;

app.use(express.static(__dirname+'/public'));

app.get('/hello', function (req, res){
    res.send("hello world")
});



app.listen(port, function () {
    console.log("Listing on port ", port)
});
