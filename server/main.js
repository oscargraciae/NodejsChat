var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

var messages = [{}];

app.get('/', function(req, res){
  res.status(200).send("Hola...Mundo");
});

io.on('connection', function(socket){
  console.log("Alguien se ha conectado con socket");
  socket.emit('message', messages);

  socket.on("new-message", function(message){
    messages.push(message);
    io.sockets.emit("message", messages);
  });

});

server.listen(8080, function(){
  console.log("El servidor esta corriendo en http://localhost:8080/");
});
