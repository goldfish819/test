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
    socket.on('join group', function (num) {
        //if(localStorage.getItem('roomNum') === null){
        if(sessionStorage.length == 0){
            socket.join(num);
            console.log(num+'번방');
            //localStorage.setItem('roomNum',num);
            sessionStorage.setItem('roomNum',num);
            
        }else{
            // socket.leave(localStorage.getItem('roomNum'));
            // console.log('leave: '+localStorage.getItem('roomNum'));
            socket.leave(sessionStorage.getItem('roomNum'));
            console.log('leave: '+sessionStorage.getItem('roomNum'));
            socket.join(num);
            console.log(num+'번방');
            //localStorage.setItem('roomNum',num);
            sessionStorage.setItem('roomNum',num);
        }
    });
});

//message
io.on('connection', function (socket) {
    socket.on('chat message', function (name,msg) {
        // console.log('message:'+ msg);
        // io.emit('chat message', msg);
        // io.sockets.in(localStorage.getItem('roomNum')).emit('chat message', name, msg);
        // console.log('roomnum: '+localStorage.getItem('roomNum')+' /text: '+msg);
        io.sockets.in(sessionStorage.getItem('roomNum')).emit('chat message', name, msg);
        console.log('roomnum: '+sessionStorage.getItem('roomNum')+' /text: '+msg);
    });
});



http.listen(3000, function() {
	console.log('listening on: 3000');
})
