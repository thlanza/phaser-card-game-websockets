const server = require('express')();
const cors = require('cors');
const shuffle = require('shuffle-array');
let players = {};
let readyCheck = 0;
let gameState = "Initializing";

const http = require('http').createServer(server);

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket) {
    console.log("Um usuário conectou: " + socket.id);

    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false
    }

    if (Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit("firstTurn");
    }

    socket.on('dealDeck', function(socketId) {
        players[socketId].inDeck = shuffle(["boolean", "ping"]);
        console.log("players", players);
        if (Object.keys(players).length < 2) return;
        io.emit('changeGameState', "Initializing");
    });

    socket.on('dealCards', function (socketId) {
        for (let i = 0; i < 5; i++) {
            if (players[socketId].inDeck.length === 0) {
                    players[socketId].inDeck = shuffle(["boolean", "ping"]);
            }
            players[socketId].inHand.push(players[socketId].inDeck.shift());
            console.log(players);
            io.emit('dealCards', socketId, players[socketId].inHand);
            readyCheck++;
            if (readyCheck >= 2) {
                gameState = "Ready";
                io.emit('changeGameState', gameState);
            }
        }
    });

    socket.on('cardPlayed', function(cardName, socketId) {
        io.emit('cardPlayed', cardName, socketId);
        io.emit('changeTurn');
    });

    socket.on('disconnect', function(reason) {
        console.log("Usuário desconectou: " + socket.id + " - Motivo: " + reason);
        delete players[socket.id];
    })
})

http.listen(3000, function() {
    console.log("Servidor rodando");
});
