var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);


var messages = [{
    id: 1,
    text: 'bienvenido a la sala de chat de socket.io y nodejs de Andres Rivera',
    nickname: 'bot - Studying'
}];

app.use(express.static('client'));

app.get('/hola-mundo', function(request, response){
response.status(200).send({ message: "hola mundo desde una ruta"});
});

io.on('connection', function(socket){
    console.log('Se ha conectado al socket');
    console.log("ip: "+socket.handshake.address);


    socket.emit('messages', messages);


    socket.on('add-message', function(data){

        messages.push(data);

        socket.emit('messages', messages);

    });

    

});


server.listen(8080, function(){
console.log('El servidor esta funcionando en localhost:8080');
});








