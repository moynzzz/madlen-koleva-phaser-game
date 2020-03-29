var level1 = {
    eagles: {
        "1": { id: 1, x: 432, y: 208, minY: 128, maxY: 208, direction: "up", flipX: false },
        "2": { id: 2, x: 752, y: 208, minY: 128, maxY: 208, direction: "up", flipX: false },
        "3": { id: 3, x: 1120, y: 240, minY: 160, maxY: 240, direction: "up", flipX: false },
        "4": { id: 4, x: 1360, y: 176, minY: 96, maxY: 176, direction: "up", flipX: false },
        "5": { id: 5, x: 2016, y: 176, minY: 96, maxY: 176, direction: "up", flipX: false },
        "6": { id: 6, x: 2656, y: 288, minY: 208 , maxY: 288, direction: "up", flipX: false },
    },
    opossums: {
        "1": { id: 1, x: 208, y: 448-16, minX: 208 , maxX: 304, direction: "right" },
        "2": { id: 2, x: 512, y: 496-16, minX: 336 , maxX: 512, direction: "left" },
        "3": { id: 3, x: 656, y: 496-16, minX: 656 , maxX: 816, direction: "right" },
        "4": { id: 4, x: 1296, y: 480-16, minX: 1184 , maxX: 1296, direction: "left" },
        "5": { id: 5, x: 2112, y: 528-16, minX: 2112 , maxX: 2320, direction: "right" },
        "6": { id: 6, x: 2656, y: 528-16, minX: 2432 , maxX: 2656, direction: "left" },
    },
    collectables: {
        "1": {id: 1, x: 80, y: 448, type: 'gem'},
        "2": {id: 2, x: 96, y: 448, type: 'gem'},
        "3": {id: 3, x: 112, y: 448, type: 'gem'},
        "4": {id: 4, x: 368, y: 272, type: 'gem'},
        "5": {id: 5, x: 336, y: 352, type: 'gem'},
        "6": {id: 6, x: 368, y: 416, type: 'gem'},
        "7": {id: 7, x: 512, y: 304, type: 'gem'},
        "8": {id: 8, x: 480, y: 352, type: 'gem'},
        "9": {id: 9, x: 514, y: 408, type: 'gem'},
        "10": {id: 10, x: 624, y: 272, type: 'gem'},
        "11": {id: 11, x: 656, y: 336, type: 'gem'},
        "12": {id: 12, x: 1056, y: 192, type: 'gem'},
        "13": {id: 13, x: 1056, y: 336, type: 'gem'},
        "14": {id: 14, x: 1056, y: 528, type: 'gem'},
        "15": {id: 15, x: 1104, y: 512, type: 'gem'},
        "16": {id: 16, x: 1152, y: 496, type: 'gem'},
        "17": {id: 17, x: 1328, y: 496, type: 'gem'},
        "18": {id: 18, x: 1376, y: 512, type: 'gem'},
        "19": {id: 19, x: 1424, y: 528, type: 'gem'},
        "20": {id: 20, x: 1472, y: 544, type: 'gem'},
        "21": {id: 21, x: 1520, y: 400, type: 'gem'},
        "22": {id: 22, x: 1424, y: 208, type: 'gem'},
        "23": {id: 23, x: 1456, y: 224, type: 'gem'},
        "24": {id: 24, x: 1488, y: 240, type: 'gem'},
        "25": {id: 25, x: 1520, y: 256, type: 'gem'},
        "26": {id: 26, x: 1776, y: 256, type: 'gem'},
        "27": {id: 27, x: 1808, y: 240, type: 'gem'},
        "28": {id: 28, x: 1840, y: 224, type: 'gem'},
        "29": {id: 29, x: 1872, y: 208, type: 'gem'},
        "30": {id: 30, x: 1792, y: 400, type: 'gem'},
        "31": {id: 31, x: 1792, y: 544, type: 'gem'},
        "32": {id: 32, x: 1920, y: 496, type: 'gem'},
        "33": {id: 33, x: 2224, y: 256, type: 'gem'},
        "34": {id: 34, x: 2176, y: 304, type: 'gem'},
        "35": {id: 35, x: 2144, y: 384, type: 'gem'},
        "36": {id: 36, x: 2176, y: 448, type: 'gem'},
        "37": {id: 37, x: 2368, y: 256, type: 'gem'},
        "38": {id: 38, x: 2288, y: 384, type: 'gem'},
        "39": {id: 39, x: 2320, y: 448, type: 'gem'},
        "40": {id: 40, x: 2432, y: 416, type: 'gem'},
        "41": {id: 41, x: 2528, y: 368, type: 'gem'},
        "42": {id: 42, x: 2784, y: 528, type: 'gem'},
        "43": {id: 43, x: 626, y: 413, type: 'cherry'},
        "44": {id: 44, x: 1968, y: 448, type: 'cherry'},
        "45": {id: 45, x: 2320, y: 336, type: 'cherry'},
        "46": {id: 46, x: 1008, y: 544, type: 'acorn'},
        "47": {id: 47, x: 1648, y: 256, type: 'acorn'},
        "48": {id: 48, x: 2320, y: 528, type: 'acorn'},
    },
};

var level2 = {
    eagles: {
        "1": { id: 1, x: 240, y: 272, minY: 192, maxY: 272, direction: "up", flipX: false },
        "2": { id: 2, x: 656, y: 272, minY: 192, maxY: 272, direction: "up", flipX: false },
        "3": { id: 3, x: 1040, y: 208, minY: 128, maxY: 208, direction: "up", flipX: false },
        "4": { id: 4, x: 1424, y: 272, minY: 192, maxY: 272, direction: "up", flipX: false },
        "5": { id: 5, x: 1808, y: 272, minY: 208, maxY: 272, direction: "up", flipX: false },
        "6": { id: 6, x: 2272, y: 272, minY: 192, maxY: 272, direction: "up", flipX: false },
        "7": { id: 7, x: 2560, y: 272, minY: 192, maxY: 272, direction: "up", flipX: false },
    },
    opossums: {
        "1": { id: 1, x: 400, y: 768, minX: 400 , maxX: 480, direction: "right" },
        "2": { id: 2, x: 656, y: 512, minX: 608 , maxX: 656, direction: "left" },
        "3": { id: 3, x: 1072, y: 848, minX: 992 , maxX: 1072, direction: "left" },
        "4": { id: 4, x: 1248, y: 848, minX: 1248 , maxX: 1376, direction: "right" },
        "5": { id: 5, x: 1584, y: 560, minX: 1584 , maxX: 1728, direction: "right" },
        "6": { id: 6, x: 2048, y: 560, minX: 1904 , maxX: 2048, direction: "left" },
    },
    collectables: {
        "1": {id: 1, x: 16, y: 288, type: 'gem'},
        "2": {id: 2, x: 48, y: 288, type: 'gem'},
        "3": {id: 3, x: 384, y: 288, type: 'gem'},
        "4": {id: 4, x: 400, y: 288, type: 'gem'},
        "5": {id: 5, x: 416, y: 288, type: 'gem'},
        "6": {id: 6, x: 432, y: 288, type: 'gem'},
        "7": {id: 7, x: 784, y: 288, type: 'gem'},
        "8": {id: 8, x: 832, y: 272, type: 'gem'},
        "9": {id: 9, x: 880, y: 256, type: 'gem'},
        "10": {id: 10, x: 928, y: 240, type: 'gem'},
        "11": {id: 11, x: 1152, y: 240, type: 'gem'},
        "12": {id: 12, x: 1200, y: 256, type: 'gem'},
        "13": {id: 13, x: 1248, y: 272, type: 'gem'},
        "14": {id: 14, x: 1312, y: 288, type: 'gem'},
        "15": {id: 15, x: 1744, y: 160, type: 'gem'},
        "16": {id: 16, x: 1760, y: 160, type: 'gem'},
        "17": {id: 17, x: 2160, y: 160, type: 'gem'},
        "18": {id: 18, x: 2176, y: 160, type: 'gem'},
        "19": {id: 19, x: 2672, y: 288, type: 'gem'},
        "20": {id: 20, x: 2704, y: 304, type: 'gem'},
        "21": {id: 21, x: 2736, y: 320, type: 'gem'},
        "22": {id: 22, x: 2768, y: 336, type: 'gem'},
        "23": {id: 23, x: 144, y: 768, type: 'gem'},
        "24": {id: 24, x: 160, y: 768, type: 'gem'},
        "25": {id: 25, x: 176, y: 768, type: 'gem'},
        "26": {id: 26, x: 528, y: 544, type: 'gem'},
        "27": {id: 27, x: 528, y: 592, type: 'gem'},
        "28": {id: 28, x: 528, y: 640, type: 'gem'},
        "29": {id: 29, x: 528, y: 688, type: 'gem'},
        "30": {id: 30, x: 368, y: 1008, type: 'gem'},
        "31": {id: 31, x: 451, y: 956, type: 'gem'},
        "32": {id: 32, x: 544, y: 880, type: 'gem'},
        "33": {id: 33, x: 592, y: 464, type: 'gem'},
        "34": {id: 34, x: 592, y: 480, type: 'gem'},
        "35": {id: 35, x: 592, y: 496, type: 'gem'},
        "36": {id: 36, x: 592, y: 512, type: 'gem'},
        "37": {id: 37, x: 800, y: 576, type: 'gem'},
        "38": {id: 38, x: 816, y: 752, type: 'gem'},
        "39": {id: 39, x: 816, y: 816, type: 'gem'},
        "40": {id: 40, x: 832, y: 784, type: 'gem'},
        "41": {id: 41, x: 848, y: 816, type: 'gem'},
        "42": {id: 42, x: 864, y: 848, type: 'gem'},
        "43": {id: 43, x: 1136, y: 608, type: 'gem'},
        "44": {id: 44, x: 1200, y: 560, type: 'gem'},
        "45": {id: 45, x: 1120, y: 384, type: 'gem'},
        "46": {id: 46, x: 1168, y: 400, type: 'gem'},
        "47": {id: 47, x: 1216, y: 416, type: 'gem'},
        "48": {id: 48, x: 1264, y: 432, type: 'gem'},
        "49": {id: 49, x: 1440, y: 512, type: 'gem'},
        "50": {id: 50, x: 1584, y: 416, type: 'gem'},
        "51": {id: 51, x: 1616, y: 480, type: 'gem'},
        "52": {id: 52, x: 1760, y: 368, type: 'gem'},
        "53": {id: 53, x: 1760, y: 476, type: 'gem'},
        "54": {id: 54, x: 1872, y: 480, type: 'gem'},
        "55": {id: 55, x: 2048, y: 416, type: 'gem'},
        "56": {id: 56, x: 2208, y: 560, type: 'gem'},
        "57": {id: 57, x: 2368, y: 368, type: 'gem'},
        "58": {id: 58, x: 2432, y: 432, type: 'gem'},
        "59": {id: 59, x: 2496, y: 592, type: 'gem'},
        "60": {id: 60, x: 2608, y: 544, type: 'gem'},
        "61": {id: 61, x: 2656, y: 592, type: 'gem'},
        "62": {id: 62, x: 2896, y: 592, type: 'gem'},
        "63": {id: 63, x: 2880, y: 528, type: 'gem'},
        "64": {id: 64, x: 2880, y: 416, type: 'gem'},
        "65": {id: 65, x: 384, y: 352, type: 'cherry'},
        "66": {id: 66, x: 736, y: 768, type: 'cherry'},
        "67": {id: 67, x: 1088, y: 464, type: 'cherry'},
        "68": {id: 68, x: 2016, y: 336, type: 'cherry'},
        "69": {id: 69, x: 2384, y: 656, type: 'cherry'},
        "70": {id: 70, x: 1728, y: 160, type: 'cherry'},
        "71": {id: 71, x: 432, y: 352, type: 'acorn'},
        "72": {id: 72, x: 288, y: 1008, type: 'acorn'},
        "73": {id: 73, x: 1024, y: 672, type: 'acorn'},
        "74": {id: 74, x: 1872, y: 336, type: 'acorn'},
        "75": {id: 75, x: 2192, y: 160, type: 'acorn'},
        "76": {id: 76, x: 2386, y: 604, type: 'acorn'},
    },
};

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};
var score = 0;
var eagles = { ... level1.eagles };
var opossums = { ... level1.opossums };
var collectables = { ... level1.collectables };

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
        lives: 3,
    };

    // send the players object to the new player
    socket.emit('currentPlayers', players);
    socket.emit('currentEagles', eagles);
    socket.emit('currentOpossums', opossums);
    socket.emit('currentScore', score);
    socket.emit('currentCollectables', collectables);

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
        score += 5;

        io.emit('currentScore', score);
        socket.broadcast.emit('currentScore', score);

        delete eagles[eagleData.eagleId];

        socket.broadcast.emit('eagleKilled', eagleData);
    });

    socket.on('killOpossum', function (opossumData) {
        score += 5;

        io.emit('currentScore', score);
        socket.broadcast.emit('currentScore', score);

        delete opossums[opossumData.opossumId];

        socket.broadcast.emit('opossumKilled', opossumData);
    });

    socket.on('endGame', function () {
        socket.broadcast.emit('gameOver');

        players = {};

        score = 0;

        eagles = { ... level1.eagles };
        opossums = { ... level1.opossums };
        collectables = { ... level1.collectables };
    });

    socket.on('collect', function (collectData) {
        var collectable = collectables[collectData.collectable];

        if (collectable.type === 'gem') {
            score += 10;
            io.emit('currentScore', score);
        } else if (collectable.type === 'cherry') {
            Object.keys(players).forEach(function (id) {
                if (players[id].characterType === 'yannie') {
                    players[id].lives = players[id].lives + 1;
                }
            });

            io.emit('playerLives', players);
        } else if (collectable.type === 'acorn') {
            Object.keys(players).forEach(function (id) {
                if (players[id].characterType === 'brannie') {
                    players[id].lives = players[id].lives + 1;
                }
            });

            io.emit('playerLives', players)
        }

        delete collectables[collectData.collectable];

        socket.broadcast.emit('collected', collectData.collectable);
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


