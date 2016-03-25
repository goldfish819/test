var express = require('express');
var app = express();
var http = require('http').Server(app);
// var server = http.createServer(app);
// var fs = require('fs');
var io = require('socket.io')(http);
var localStorage = require('localStorage');
var sessionStorage = require('sessionstorage');


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

app.get('/react', function (req, res) {
    res.sendFile(__dirname+'/react.html');
});

io.on('connection',function (socket) {
    console.log('a user connected');
    socket.on('disconnect',function () {
        console.log('a user disconnected');
    });
});

//create
var socketRoom = {};
var roomCount =1;
io.on('connection', function (socket) {
    socket.on('create group', function () {
        console.log('num: '+roomCount+'생성');
        socketRoom[roomCount] = socket.id;
        console.log(socketRoom);
        io.emit('create group',roomCount);
        roomCount++;
        var rooms = io.sockets.adapter;
        console.log(rooms);
    });
});

//join
io.on('connection',function (socket) {
    socket.on('join group', function (num,ss) {
        if(ss === null){
            socket.join(num);
            socket.emit('store', num);
            console.log(num+'번방');
        }else{
            socket.leave(ss);
            console.log('leave: '+ss);
            socket.join(num);
            console.log(num+'번방');
            socket.emit('store', num);
        }
    });
});

//message
io.on('connection', function (socket) {
    socket.on('chat message', function (name,msg,ss) {
        // console.log('message:'+ msg);
        // io.emit('chat message', msg);
        // io.sockets.in(localStorage.getItem('roomNum')).emit('chat message', name, msg);
        // console.log('roomnum: '+localStorage.getItem('roomNum')+' /text: '+msg);
        io.sockets.in(ss).emit('chat message', name, msg);
        console.log('roomnum: '+ss+' /text: '+msg);
    });
});

//connection status
// console.log('check 1', socket.connected);
// socket.on('connect', function() {
//   console.log('check 2', socket.connected);
// });

http.listen(3000, function() {
	console.log('listening on: 3000');
})
