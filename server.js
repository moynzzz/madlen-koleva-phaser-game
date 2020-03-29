var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};
var eagles = {
    "1": { id: 1, x: 130/*432*/, y: 208, minY: 128, maxY: 208, direction: "up", flipX: false },
    "2": { id: 2, x: 752, y: 208, minY: 128, maxY: 208, direction: "up", flipX: false },
    "3": { id: 3, x: 1120, y: 240, minY: 160, maxY: 240, direction: "up", flipX: false },
    "4": { id: 4, x: 1360, y: 176, minY: 96, maxY: 176, direction: "up", flipX: false },
    "5": { id: 5, x: 2016, y: 176, minY: 96, maxY: 176, direction: "up", flipX: false },
    "6": { id: 6, x: 2656, y: 288, minY: 208 , maxY: 288, direction: "up", flipX: false },
};
var opossums = {
    "7": { id: 7, x: 130, y: 208, minX: 208 , maxX: 304, direction: "right" },
    "1": { id: 1, x: 208, y: 448-16, minX: 208 , maxX: 304, direction: "right" },
    "2": { id: 2, x: 512, y: 496-16, minX: 336 , maxX: 512, direction: "left" },
    "3": { id: 3, x: 656, y: 496-16, minX: 656 , maxX: 816, direction: "right" },
    "4": { id: 4, x: 1296, y: 480-16, minX: 1184 , maxX: 1296, direction: "left" },
    "5": { id: 5, x: 2112, y: 528-16, minX: 2112 , maxX: 2320, direction: "right" },
    "6": { id: 6, x: 2656, y: 528-16, minX: 2432 , maxX: 2656, direction: "left" },
};

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    // create a new player and add it to our players object
    players[socket.id] = {
        rotation: 0,
        x: 80,
        y: 224 - 16,
        playerId: socket.id,
        flipX: false,
        currentAnim: { key: socket.handshake.query.characterType + '-idle' },
        playerName: socket.handshake.query.playerName,
        characterType: socket.handshake.query.characterType,
    };

    // send the players object to the new player
    socket.emit('currentPlayers', players);
    socket.emit('currentEagles', eagles);
    socket.emit('currentOpossums', opossums);

    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('disconnect', function () {
        // remove this player from our players object
        delete players[socket.id];

        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        players[socket.id].flipX = movementData.flipX;
        players[socket.id].currentAnim = movementData.currentAnim;

        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('killEagle', function (eagleData) {
        delete eagles[eagleData.eagleId];

        socket.broadcast.emit('eagleKilled', eagleData);
    });

    socket.on('killOpossum', function (opossumData) {
        delete opossums[opossumData.opossumId];

        socket.broadcast.emit('opossumKilled', opossumData);
    });
});

var eagleSpeed = 1.9;
var opossumsSpeed = 1.4;

function moveEnemies()
{
    Object.keys(eagles).forEach(function (id) {
        if (eagles[id].direction === "up") {
            eagles[id].y -= eagleSpeed;

            if (eagles[id].y <= eagles[id].minY) {
                eagles[id].y = eagles[id].minY;
                eagles[id].direction = 'down';
            }
        } else {
            eagles[id].y += eagleSpeed;

            if (eagles[id].y >= eagles[id].maxY) {
                eagles[id].y = eagles[id].maxY;
                eagles[id].direction = 'up';
            }
        }
    });

    Object.keys(opossums).forEach(function (id) {
        if (opossums[id].direction === "left") {
            opossums[id].x -= opossumsSpeed;

            if (opossums[id].x <= opossums[id].minX) {
                opossums[id].x = opossums[id].minX;
                opossums[id].direction = 'right';
            }
        } else {
            opossums[id].x += opossumsSpeed;

            if (opossums[id].x >= opossums[id].maxX) {
                opossums[id].x = opossums[id].maxX;
                opossums[id].direction = 'left';
            }
        }
    });

    io.emit('eaglesMovement', eagles);
    io.emit('opossumMovement', opossums);
}

setInterval(moveEnemies, 1000 / 30);

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});


