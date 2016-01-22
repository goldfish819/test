// server
var http = require("http");
var url = require("url");

http.createServer(function (request, response){
        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write("Hello World");
        response.end();
}).listen(8080);
console.log("Server stared");



function start(route){
function onRequest(request, response) {
var pathname = url.parse(request.url).pathname;
    console.log("Request for "+pathname+"Received");
    route(pathname);
    response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write("Hello World");
        response.end();
}
http.createServer(onRequest).listen(8080);
console.log("Server has stared");
}
exports.start = start;


function route(pathname){
    console.log("About to route a request for" + pathname);
}

exports.route = route;