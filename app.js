 var express = require("express");
var app = express();
var http = require('http');
var server = http.createServer(app);

app.get('/', function(req, res) {
    console.log('!!!');
	res.send('aaaa');
})

app.get('/test', function(req, res) {
    console.log('test')
    res.send('test')
})

app.get('/test/json', function(req,res) {
    console.log('/test/json')
    res.send({aaa:'aaa', bbb: '3333', ccc: ['a','b','c']})
})

server.listen(8000, function() {
	console.log('listen: ' + 8000)
})
