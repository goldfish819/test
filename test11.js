// server
var express = require("express"),
   http = require('http'),
   app = express(),
   server = http.createServer(app);
   
app.get('/',function (req, res){
    res.send('Hello');
});

app.get('world.html', function (req, res){
    res.send('Hello World');
});

server.listen(8080, function(){
    console.log('aaa' + server.address().port);
});
   
   
   
   
   
   
   
// var http = require("http");
// var url = require("url");

// http.createServer(function (request, response){
//         response.writeHead(200, {"Content-Type" : "text/plain"});
//         response.write("Hello World");
//         response.end();
// }).listen(8080);
// console.log("Server stared");
