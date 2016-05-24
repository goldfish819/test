var express = require('express');
var app = express();
var http = require('http').Server(app);
// var server = http.createServer(app);
// var fs = require('fs');
var io = require('socket.io')(http);
var request = require('request');
var cheerio = require('cheerio');

app.use('/public', express.static('public'))

app.get('/', function(req, res) {
    //console.log('!!!');
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

app.get('/issue', function (req, res) {
    res.sendFile(__dirname+'/issueEdit.html');
});

var options = {
        //url: 'http://m.blog.naver.com/lllsoulll/220442614753',
        url: 'http://m.blog.naver.com/blackeyescat/220666633703',
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
        }
      };

var url = 'http://m.blog.naver.com/PostView.nhn?blogId=taijilll&logNo=220692271980';
request(options, function(error, response, html){
if (error) {throw error};
var $ = cheerio.load(html);
console.log(html);
//var a = $('#_post_property')[0].attribs;

var a = $('img')[1].attribs.src;
var b = $('span');
var arr = [];
if(a.slice(7,11) == 'mblo'){
    console.log('yes');
    a = $('img')[1].attribs.src;
}else{
    console.log('no');
    for(var i=0;i<b.length;i++){
        if(b[i].attribs.thumburl){
        arr.push(b[i].attribs.thumburl+'w2'); 
    }
    }
    //console.log(arr);
    a = arr[10];
}
// a.slice(a.indexOf('?')-3, a.indexOf('?')) == 'png' || a.slice(7,11) == 'mash' || a.slice(7,11) == 'blog'
//var s = a.indexOf(':');

//var ss = a.substring(0, a.indexOf(':'));

//var aa = typeof a;
//var a = typeof $;
//console.log(aa);
console.log(a);
//console.log(b);
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
