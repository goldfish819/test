var express = require("express");
var app = express();
var http = require('http');
var server = http.createServer(app);
var fs = require('fs');
var io = require('socket.io')(http);


app.use('/public', express.static('public'))

app.get('/', function(req, res) {
    console.log('!!!');
	res.send('aaaa');
})
// app.use('/',require('./test11'))
app.get('/test', function(req, res) {
    console.log('test')
    res.send('test')
})

app.get('/test/:name', function(req,res) {
    console.log('/test/json')
    res.send({aaa:'aaa', bbb: '3333', ccc: ['a','b','c']})
})

/*app.get('/public/package.json', function(req, res) {
    fs.readFile('./package.json', function(err, file) {
        if(err) return res.json(err);
        res.send(file);
    })
})*/

app.get('/chat', function (req, res) {
    res.sendFile(__dirname+'/chat.html');
});

io.on('connection',function (socket) {
    console.log('a user connected');
});

server.listen(3000, function() {
	console.log('listening on: 3000');
})
