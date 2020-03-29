var playerName = null;
var characterType = null;
var score = null;

var Boot = new Phaser.Class({
    Extends: Phaser.Scene,
    background: null,
    menu_background: null,
    play_btn: null,
    options_btn: null,
    exit_btn: null,
    player1: null,
    player2: null,
    menu_overlay: null,
    options_background: null,
    champion_select_background: null,
    yannie_btn: null,
    brannie_btn: null,
    yannie_image: null,
    brannie_image: null,
    menuBackgroundMusic: null,
    initialize: function Boot() {
        Phaser.Scene.call(this, {key: 'boot', active: true});
    },
    preload: function () {
        this.load.image('background', 'assets/environment/back.png');
        this.load.image('menu-background', 'assets/menu/menu-back.png');
        this.load.image('play-btn', 'assets/menu/play-btn.png');
        this.load.image('options-btn', 'assets/menu/options-btn.png');
        this.load.image('options-background', 'assets/menu/options-back.png');
        this.load.image('close-btn', 'assets/menu/close-btn.png');
        this.load.image('exit-btn', 'assets/menu/exit-btn.png');
        this.load.image('player1', 'assets/menu/player-1.png');
        this.load.image('player2', 'assets/menu/player-2.png');
        this.load.image('champion-select-background', 'assets/menu/champion-select-back.png');
        this.load.image('yannie-btn', 'assets/menu/yannie-btn.png');
        this.load.image('brannie-btn', 'assets/menu/brannie-btn.png');
        this.load.audio('menu_background', 'assets/sound/menu_background.mp3');
    },
    create: function () {
        this.menuBackgroundMusic = this.sound.add('menu_background', {
            loop: true,
            volume: 0.50,
        });
        this.menuBackgroundMusic.play();

        this.background = this.add.tileSprite(config.scale.width / 2, config.scale.height / 2, config.scale.width, config.scale.height, 'background');
        this.menu_background = this.add.image(config.scale.width / 2, config.scale.height / 2, 'menu-background');
        this.play_btn = this.add.image(config.scale.width / 2, 70, 'play-btn').setInteractive();
        this.options_btn = this.add.image(config.scale.width / 2, 100, 'options-btn').setInteractive();
        this.exit_btn = this.add.image(config.scale.width / 2, 130, 'exit-btn').setInteractive();

        this.player1 = this.add.image(config.scale.width / 2 - 40, 145, 'player1');
        this.player2 = this.add.image(config.scale.width / 2 + 40, 145, 'player2');

        this.menu_overlay = this.add.graphics().setVisible(false);
        this.menu_overlay.fillRect(0, 0, config.scale.width, config.scale.height, 0x000000);
        this.menu_overlay.fillStyle(0x000000, 0.3);

        this.options_background = this.add.image(config.scale.width / 2, config.scale.height / 2, 'options-background').setVisible(false);

        this.champion_select_background = this.add.image(config.scale.width / 2, config.scale.height / 2, 'champion-select-background').setVisible(false);
        this.yannie_btn = this.add.image(config.scale.width / 2 + 20, config.scale.height / 2 - 10, 'yannie-btn').setVisible(false).setInteractive();
        this.brannie_btn = this.add.image(config.scale.width / 2 + 20, config.scale.height / 2 + 25, 'brannie-btn').setVisible(false).setInteractive();
        this.yannie_image = this.add.image(config.scale.width / 2 - 40, config.scale.height / 2 - 15, 'player2').setVisible(false);
        this.brannie_image = this.add.image(config.scale.width / 2 - 35, config.scale.height / 2 + 15, 'player1').setVisible(false);

        this.close_btn = this.add.image(config.scale.width / 2, 152, 'close-btn').setVisible(false).setInteractive();

        this.play_btn.on('pointerdown', this.openChampionSelectMenu, this);
        this.options_btn.on('pointerdown', this.openOptionsMenu, this);
        this.close_btn.on('pointerdown', this.closeOpenedMenu, this);
        this.exit_btn.on('pointerdown', this.exitGame, this);
        this.input.keyboard.on('keydown-ESC', this.closeOpenedMenu, this);

        this.yannie_btn.on('pointerdown', function () {
            this.play('yannie')
        }, this);

        this.brannie_btn.on('pointerdown', function () {
            this.play('brannie');
        }, this);
    },
    update: function (time, delta) {
        this.background.tilePositionX += delta * 0.02;
    },
    openOptionsMenu: function () {
        this.menu_overlay.setVisible(true);
        this.close_btn.setVisible(true);

        this.options_background.setVisible(true);
    },
    closeOptionsMenu: function () {
        this.menu_overlay.setVisible(false);
        this.close_btn.setVisible(false);

        this.options_background.setVisible(false);
    },
    openChampionSelectMenu: function () {
        this.menu_overlay.setVisible(true);
        this.close_btn.setVisible(true);

        this.champion_select_background.setVisible(true);
        this.yannie_btn.setVisible(true);
        this.brannie_btn.setVisible(true);
        this.yannie_image.setVisible(true);
        this.brannie_image.setVisible(true);
    },
    closeChampionSelectMenu: function () {
        this.menu_overlay.setVisible(false);
        this.close_btn.setVisible(false);

        this.champion_select_background.setVisible(false);
        this.yannie_btn.setVisible(false);
        this.brannie_btn.setVisible(false);
        this.yannie_image.setVisible(false);
        this.brannie_image.setVisible(false);
    },
    exitGame: function () {
        window.location = '../../index.html';
    },
    closeOpenedMenu: function () {
        if (this.options_background.visible) {
            this.closeOptionsMenu();
        }

        if (this.champion_select_background.visible) {
            this.closeChampionSelectMenu();
        }
    },
    play: function (character) {
        characterType = character;
        playerName = prompt("Please enter your name", character);

        this.menuBackgroundMusic.stop();

        this.scene.start('game');
    }
});

var Game = new Phaser.Class({
    Extends: Phaser.Scene,
    socket: null,
    player: null,
    map: null,
    cursors: null,
    worldLayer: null,
    skyLayer: null,
    bushesLayer: null,
    backgroundLayer: null,
    locksLayer: null,
    spikesLayer: null,
    otherPlayers: null,
    eagles: null,
    opossums: null,
    playerNames: null,
    lives: null,
    collectables: null,
    gameBackgroundMusic: null,
    hurtSound: null,
    playerHurtSound: null,
    collectSound: null,
    unlockSound: null,
    gameOverSound: null,
    gameSuccessSound: null,
    initialize: function Game() {
        Phaser.Scene.call(this, {key: 'game'});
    },
    preload: function () {
        this.load.tilemapTiledJSON('map1', 'assets/environment/map1.json');
        this.load.tilemapTiledJSON('map2', 'assets/environment/map2.json');
        this.load.spritesheet('props', 'assets/environment/props.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('tileset', 'assets/environment/tileset.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('middle', 'assets/environment/middle.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('wallpaper', 'assets/environment/back.png', {frameWidth: 16, frameHeight: 16});
        this.load.atlas('yannie', 'assets/yannie/yannie.png', 'assets/yannie/yannie.json');
        this.load.atlas('brannie', 'assets/brannie/brannie.png', 'assets/brannie/brannie.json');
        this.load.atlas('eagle', 'assets/eagle/eagle.png', 'assets/eagle/eagle.json');
        this.load.atlas('enemy_death', 'assets/enemy_death/enemy_death.png', 'assets/enemy_death/enemy_death.json');
        this.load.atlas('opossum', 'assets/opossum/opossum.png', 'assets/opossum/opossum.json');
        this.load.atlas('collectable', 'assets/collectable/collectable.png', 'assets/collectable/collectable.json');
        this.load.spritesheet('heart', 'assets/heart/heart.png', {frameWidth: 17, frameHeight: 17});
        this.load.audio('collect', 'assets/sound/collect.wav');
        this.load.audio('hurt', 'assets/sound/hurt.wav');
        this.load.audio('player_hurt', 'assets/sound/player_hurt.wav');
        this.load.audio('game_background', 'assets/sound/game_background.mp3');
        this.load.audio('unlock', 'assets/sound/unlock.wav');
        this.load.audio('game_over', 'assets/sound/game_over.wav');
        this.load.audio('game_success', 'assets/sound/game_success.wav');
    },
    create: function () {
        var self = this;

        this.gameBackgroundMusic = this.sound.add('game_background', {
            loop: true,
            volume: 0.50,
        });
        this.gameBackgroundMusic.play();
        this.gameBackgroundMusic.setMute(true);

        this.hurtSound = this.sound.add('hurt');
        this.playerHurtSound = this.sound.add('player_hurt');
        this.collectSound = this.sound.add('collect');
        this.unlockSound = this.sound.add('unlock');
        this.gameOverSound = this.sound.add('game_over');
        this.gameSuccessSound = this.sound.add('game_success');

        this.socket = io('http://localhost:8081/', { query: "playerName=" + encodeURIComponent(playerName) + "&characterType=" + encodeURIComponent(characterType) });
        this.otherPlayers = this.physics.add.group({
            allowGravity: false
        });
        this.eagles = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.opossums = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.collectables = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.playerNames = this.add.group();
        this.lives = this.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'yannie-idle',
            frames: this.anims.generateFrameNames('yannie', {prefix: 'player-idle-', start: 1, end: 4, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'yannie-run',
            frames: this.anims.generateFrameNames('yannie', {prefix: 'player-run-', start: 1, end: 6, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'yannie-jump',
            frames: this.anims.generateFrameNames('yannie', {prefix: 'player-jump-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'yannie-crouch',
            frames: this.anims.generateFrameNames('yannie', {prefix: 'player-crouch-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'yannie-hurt',
            frames: this.anims.generateFrameNames('yannie', {prefix: 'player-hurt-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'brannie-idle',
            frames: this.anims.generateFrameNames('brannie', {prefix: 'player-idle-', start: 1, end: 8, zeroPad: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'brannie-run',
            frames: this.anims.generateFrameNames('brannie', {prefix: 'player-run-', start: 1, end: 6, zeroPad: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'brannie-jump',
            frames: this.anims.generateFrameNames('brannie', {prefix: 'player-jump-', start: 1, end: 4, zeroPad: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'brannie-crouch',
            frames: this.anims.generateFrameNames('brannie', {prefix: 'player-crouch-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'brannie-hurt',
            frames: this.anims.generateFrameNames('brannie', {prefix: 'player-hurt-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNames('eagle', {prefix: 'eagle-attack-', start: 1, end: 4, zeroPad: 1}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'opossum',
            frames: this.anims.generateFrameNames('opossum', {prefix: 'opossum-', start: 1, end: 6, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'gem',
            frames: this.anims.generateFrameNames('collectable', {prefix: 'gem-', start: 1, end: 5, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'cherry',
            frames: this.anims.generateFrameNames('collectable', {prefix: 'cherry-', start: 1, end: 7, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'acorn',
            frames: this.anims.generateFrameNames('collectable', {prefix: 'acorn-', start: 1, end: 3, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'collect',
            frames: this.anims.generateFrameNames('collectable', {prefix: 'item-feedback-', start: 1, end: 4, zeroPad: 1}),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'enemy_death',
            frames: this.anims.generateFrameNames('enemy_death', {prefix: 'enemy-death-', start: 1, end: 6, zeroPad: 1}),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'unlock_animation',
            frames: this.anims.generateFrameNames('enemy_death', {prefix: 'enemy-death-', start: 1, end: 6, zeroPad: 1}),
            frameRate: 8,
            repeat: 0
        });

        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    self.addPlayer(players[id]);
                } else {
                    self.addOtherPlayer(players[id]);
                }
            });
        });

        this.socket.on('newPlayer', function (playerInfo) {
            self.addOtherPlayer(playerInfo);
        });

        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });

            self.playerNames.getChildren().forEach(function (playerName) {
                if (playerId === playerName.playerId) {
                    playerName.destroy();
                }
            });
        });

        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setRotation(playerInfo.rotation);
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                    otherPlayer.setFlipX(playerInfo.flipX);
                    otherPlayer.anims.play(playerInfo.currentAnim.key, true);
                }
            });

            self.playerNames.getChildren().forEach(function (playerName) {
                if (playerInfo.playerId === playerName.playerId) {
                    playerName.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

        this.socket.on('currentEagles', function (eagles) {
            Object.keys(eagles).forEach(function (id) {
                var eagle = self.physics.add.sprite(eagles[id].x, eagles[id].y, 'eagle');

                eagle.flipX = eagles[id].flipX;
                eagle.setCollideWorldBounds(true);
                eagle.anims.play('fly', true);
                eagle.body.allowGravity = false;
                eagle.body.immovable = true;
                eagle.eagleId = eagles[id].id;

                self.physics.add.collider(self.worldLayer, eagle);

                self.eagles.add(eagle);
            });
        });

        this.socket.on('currentOpossums', function (opossums) {
            Object.keys(opossums).forEach(function (id) {
                var opossum = self.physics.add.sprite(opossums[id].x, opossums[id].y, 'opossum');

                opossum.flipX = opossums[id].direction === 'left';
                opossum.setCollideWorldBounds(true);
                opossum.anims.play('opossum', true);
                opossum.body.allowGravity = false;
                opossum.body.immovable = true;
                opossum.opossumId = opossums[id].id;

                self.physics.add.collider(self.worldLayer, opossum);

                self.opossums.add(opossum);
            });
        });

        this.socket.on('eaglesMovement', function (eagles) {
            self.eagles.getChildren().forEach(function (eagle) {
                eagle.x = eagles[eagle.eagleId].x;
                eagle.y = eagles[eagle.eagleId].y;
                eagle.flipX = eagles[eagle.eagleId].flipX;
            });
        });

        this.socket.on('opossumMovement', function (opossums) {
            self.opossums.getChildren().forEach(function (opossum) {
                opossum.x = opossums[opossum.opossumId].x;
                opossum.y = opossums[opossum.opossumId].y;
                opossum.flipX = opossums[opossum.opossumId].direction === 'right';
            });
        });

        this.socket.on('eagleKilled', function (eagleData) {
            self.eagles.getChildren().forEach(function (eagle) {
                if (eagleData.eagleId === eagle.eagleId) {
                    self.createEnemyDeath(eagle.x, eagle.y);
                    eagle.destroy();
                }
            });
        });

        this.socket.on('opossumKilled', function (opossumData) {
            self.opossums.getChildren().forEach(function (opossum) {
                if (opossumData.opossumId === opossum.opossumId) {
                    self.createEnemyDeath(opossum.x, opossum.y);
                    opossum.destroy();
                }
            });
        });

        this.socket.on('collected', function (collectableId) {
            self.collectables.getChildren().forEach(function (collectable) {
                if (collectableId === collectable.collectableId) {
                    self.createCollectAnimation(collectable.x, collectable.y);
                    collectable.destroy();
                }
            });
        });

        this.socket.on('gameOver', function () {
            self.endGame();
        });

        this.socket.on('currentScore', function (currentScore) {
            score = currentScore;

            if (!self.scoreText) {
                self.scoreText = self.add.text(config.scale.width, 0, "Score: " + currentScore);
                self.scoreText.setOrigin(1, 0);
                self.scoreText.setColor('#ffea49');
                self.scoreText.setScrollFactor(0);
            } else {
                self.scoreText.setText("Score: " + currentScore);
            }
        });

        this.socket.on('currentCollectables', function (collectables) {
            Object.keys(collectables).forEach(function (id) {
                self.addCollectable(collectables[id]);
            });

            self.physics.add.overlap(self.player, self.collectables, function (player, collectable) {
                self.collect(player, collectable);
            });
        });

        this.socket.on('playerLives', function (players) {
            Object.keys(players).forEach(function (id) {
                if (id === self.player.playerId) {
                    self.lives.clear(true, true);

                    for (var i = 0; i < players[id].lives; i++) {
                        var heart = self.add.sprite((17 * i) + (i === 0 ? 0 : 4 * i) + 3, 3, 'heart');

                        heart.setOrigin(0, 0);
                        heart.setScrollFactor(0);

                        self.lives.add(heart);
                    }
                }
            });
        });

        this.socket.on('levelCompleted', function () {
            self.nextLevel();
        });

        this.socket.on('currentLevel', function (currentLevel) {
            if (currentLevel === 1) {
                self.map = self.make.tilemap({ key: 'map1' });
            } else if (currentLevel === 2) {
                self.map = self.make.tilemap({ key: 'map2' });
            } else {
                throw "Not existing level.";
            }

            var middle = self.map.addTilesetImage('middle');
            var props = self.map.addTilesetImage('props');
            var tileset = self.map.addTilesetImage('tileset');
            var wallpaper = self.map.addTilesetImage('wallpaper');

            self.skyLayer = self.map.createDynamicLayer('Sky', [middle, props, tileset, wallpaper]);
            self.bushesLayer = self.map.createDynamicLayer('Bushes', [middle, props, tileset, wallpaper]);
            self.backgroundLayer = self.map.createDynamicLayer('Background', [middle, props, tileset, wallpaper]);
            self.locksLayer = self.map.createDynamicLayer('Locks', [middle, props, tileset, wallpaper]);
            self.spikesLayer = self.map.createDynamicLayer('Spikes', [middle, props, tileset, wallpaper]);
            self.worldLayer = self.map.createDynamicLayer('World', [middle, props, tileset, wallpaper]);

            self.worldLayer.setCollisionByExclusion([-1]);
            self.spikesLayer.setCollisionByExclusion([-1]);

            self.physics.world.bounds.width = self.worldLayer.width;
            self.physics.world.bounds.height = self.worldLayer.height;

            self.cameras.main.setBounds(0, 0, self.map.widthInPixels, self.map.heightInPixels);
            self.cameras.main.setBackgroundColor('#ccccff');
        });

        this.socket.on('unlockRegions', function (regions) {
            self.unlockRegions(regions);
        });

        this.socket.on('unlockedRegions', function (regions) {
            for (var i = 0; i < regions.length; i++) {
                self.setUnlockedRegions(regions[i]);
            }
        });
    },
    update: function (time, delta) {
        if (!this.player) {
            return;
        }

        var x = this.player.x;
        var y = this.player.y;
        var rotation = this.player.rotation;
        var flipX = this.player.flipX;
        var currentAnim = {
            key: this.player.anims.currentAnim ? this.player.anims.currentAnim.key : 'idle',
        };

        if (
            this.player.oldPosition &&
            (
                x !== this.player.oldPosition.x ||
                y !== this.player.oldPosition.y ||
                rotation !== this.player.oldPosition.rotation ||
                flipX !== this.player.oldPosition.flipX ||
                currentAnim.key !== this.player.oldPosition.currentAnim.key
            )
        ) {
            this.socket.emit('playerMovement', {
                x: x,
                y: y,
                rotation: rotation,
                flipX: flipX,
                currentAnim: currentAnim,
            });
        }

        // save old position data
        this.player.oldPosition = {
            x: x,
            y: y,
            rotation: rotation,
            flipX: flipX,
            currentAnim: currentAnim,
        };

        var movementSpeed = 100;
        var isOnFloor = this.player.body.onFloor();
        var shouldJump = this.cursors.space.isDown || this.cursors.up.isDown;
        var shouldCrouch = this.cursors.down.isDown;

        if (shouldCrouch && isOnFloor) {
            movementSpeed /= 1.8;

            if (characterType === 'yannie') {
                this.player.body.setSize(15, 16);
                this.player.body.setOffset(9, 15);
            } else {
                this.player.body.setSize(17, 24);
                this.player.body.setOffset(39, 24);
            }
        } else {
            if (characterType === 'yannie') {
                this.player.body.setSize(15, 19);
                this.player.body.setOffset(9, 12);
            } else {
                this.player.body.setSize(17, 24);
                this.player.body.setOffset(39, 24);
            }
        }

        if (this.cursors.left.isDown) {
            if (isOnFloor && !shouldCrouch) {
                this.player.anims.play(characterType + '-run', true);
            }

            this.player.body.setVelocityX(-movementSpeed);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            if (isOnFloor && !shouldCrouch) {
                this.player.anims.play(characterType + '-run', true);
            }

            this.player.body.setVelocityX(movementSpeed);
            this.player.flipX = false;
        } else if (isOnFloor) {
            if (!shouldCrouch && !this.player.isHurt) {
                this.player.anims.play(characterType + '-idle', true);
            }

            this.player.setVelocityX(0);
        }

        if (shouldJump && isOnFloor) {
            this.player.anims.play(characterType + '-jump', true);
            this.player.body.setVelocityY(-450);
        } else if (shouldCrouch && isOnFloor) {
            this.player.anims.play(characterType + '-crouch', true);

            if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
                this.player.setVelocityX(0);
            }
        }

        if (this.player.isHurt) {
            this.player.anims.play(characterType + '-hurt', true);
        }

        var self = this;

        this.playerNames.getChildren().forEach(function (playerName) {
            if (self.player.playerId === playerName.playerId) {
                playerName.setPosition(self.player.x, self.player.y);
            }
        });
    },
    addPlayer: function (playerInfo) {
        var that = this;

        this.player = this.physics.add.sprite(playerInfo.x, playerInfo.y, playerInfo.characterType);
        this.player.setCollideWorldBounds(true);

        if (playerInfo.characterType === 'yannie') {
            this.player.body.setSize(14, 19);
            this.player.body.setOffset(9, 12);
        } else {
            this.player.body.setSize(17, 24);
            this.player.body.setOffset(39, 24);
            this.player.scaleX = 0.8;
            this.player.scaleY = 0.8;
        }

        this.player.playerId = playerInfo.playerId;
        this.player.anims.play(playerInfo.currentAnim.key, true);

        this.physics.add.collider(this.worldLayer, this.player);

        this.spikesLayer.setTileIndexCallback(270, function () {
            if (that.player && !that.player.isHurt) {
                that.player.isHurt = true;

                that.removeLive();

                setTimeout(function () {
                    if (that.player) {
                        that.player.isHurt = false;
                    }
                }, 1000);
            }
        }, this);

        this.spikesLayer.setTileIndexCallback(322, function () {
            if (that.player && !that.player.isHurt) {
                that.player.isHurt = true;

                that.removeLive();

                setTimeout(function () {
                    if (that.player) {
                        that.player.isHurt = false;
                    }
                }, 1000);
            }
        }, this);

        this.physics.add.overlap(this.player, this.spikesLayer);
        this.cameras.main.startFollow(this.player, true);

        var text = this.add.text(playerInfo.x, playerInfo.y, playerInfo.playerName);

        text.setOrigin(0.5, 1.5);
        text.setColor('#ffffff');

        text.playerName = playerInfo.playerName;
        text.playerId = playerInfo.playerId;

        this.playerNames.add(text);

        this.physics.add.overlap(this.player, this.eagles, function (player, eagle) {
            if (!player.isHurt && player.body.velocity.y > 0 && player.body.y < eagle.body.y) {
                that.socket.emit('killEagle', { eagleId: eagle.eagleId });
                that.createEnemyDeath(eagle.x, eagle.y);
                eagle.destroy();
                player.setVelocityY(-200);
            } else {
                player.anims.play(playerInfo.characterType + '-hurt', true);

                if (!player.isHurt) {
                    that.removeLive();

                    setTimeout(function () {
                        if (player) {
                            player.isHurt = false;
                        }
                    }, 1000);
                }

                player.isHurt = true;
            }
        });

        this.physics.add.overlap(this.player, this.opossums, function (player, opossum) {
            if (!player.isHurt && player.body.velocity.y > 0 && player.body.y < opossum.body.y) {
                that.socket.emit('killOpossum', { opossumId: opossum.opossumId });
                that.createEnemyDeath(opossum.x, opossum.y);
                opossum.destroy();
                player.setVelocityY(-200);
            } else {
                player.anims.play(playerInfo.characterType + '-hurt', true);

                if (!player.isHurt) {
                    that.removeLive();

                    setTimeout(function () {
                        if (player) {
                            player.isHurt = false;
                        }
                    }, 1000);
                }

                player.isHurt = true;
            }
        });

        for (var i = 0; i < playerInfo.lives; i++) {
            var heart = this.add.sprite((17 * i) + (i === 0 ? 0 : 4 * i) + 3, 3, 'heart');

            heart.setOrigin(0, 0);
            heart.setScrollFactor(0);

            this.lives.add(heart);
        }
    },
    addOtherPlayer: function (playerInfo) {
        var otherPlayer = this.physics.add.sprite(playerInfo.x, playerInfo.y, playerInfo.characterType);

        otherPlayer.setCollideWorldBounds(true);

        if (playerInfo.characterType === 'yannie') {
            otherPlayer.body.setSize(14, 19);
            otherPlayer.body.setOffset(9, 12);
        } else {
            otherPlayer.body.setSize(17, 24);
            otherPlayer.body.setOffset(39, 24);
            otherPlayer.scaleX = 0.8;
            otherPlayer.scaleY = 0.8;
        }

        otherPlayer.playerId = playerInfo.playerId;
        otherPlayer.anims.play(playerInfo.currentAnim.key, true);

        this.physics.add.collider(this.worldLayer, otherPlayer);

        this.otherPlayers.add(otherPlayer);

        var text = this.add.text(playerInfo.x, playerInfo.y, playerInfo.playerName);

        text.setOrigin(0.5, 1.5);
        text.setColor('#ffffff');

        text.playerName = playerInfo.playerName;
        text.playerId = playerInfo.playerId;

        this.playerNames.add(text);
    },
    createEnemyDeath: function (x, y) {
        this.hurtSound.play();

        var enemyDeath = this.add.sprite(x, y, 'enemy_death');

        enemyDeath.play('enemy_death');
        enemyDeath.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            enemyDeath.destroy();
        });
    },
    createUnlockAnimation: function (x, y) {
        var unlockAnimation = this.add.sprite(x, y, 'enemy_death');

        unlockAnimation.play('unlock_animation');
        unlockAnimation.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            unlockAnimation.destroy();
        });
    },
    removeLive: function () {
        this.playerHurtSound.play();

        var live = this.lives.children.entries[this.lives.children.entries.length - 1];

        live.destroy();

        this.socket.emit('removeLive', this.player.playerId);

        if (this.lives.children.entries.length === 0) {
            this.socket.emit('endGame');
            this.endGame();
        }
    },
    endGame: function () {
        this.socket.disconnect();

        this.scoreText.destroy();
        this.scoreText = null;

        this.player.destroy();
        this.player = null;

        this.gameBackgroundMusic.stop();
        this.gameOverSound.play();

        this.scene.start('game_over');
    },
    nextLevel: function () {
        this.socket.disconnect();

        this.scoreText.destroy();
        this.scoreText = null;

        this.player.destroy();
        this.player = null;

        this.gameBackgroundMusic.stop();
        this.gameSuccessSound.play();

        this.scene.start('game_over');
    },
    addCollectable: function (collectable) {
        var collectableSprite = this.physics.add.sprite(collectable.x, collectable.y, 'collectable');

        collectableSprite.setOrigin(0.5, 1);

        if (collectable.type === 'cherry') {
            collectableSprite.setOrigin(0.5, 0.8);
            collectableSprite.setOffset(2, 2);
        }

        collectableSprite.anims.play(collectable.type, true);

        collectableSprite.collectableId = collectable.id;
        collectableSprite.type = collectable.type;

        this.collectables.add(collectableSprite);
    },
    collect: function (player, collectable) {
        this.socket.emit('collect', { player: player.playerId, collectable: collectable.collectableId});

        this.collectSound.play();

        this.createCollectAnimation(collectable.x, collectable.y);

        collectable.destroy();
    },
    createCollectAnimation: function (x, y) {
        var collect = this.add.sprite(x, y, 'collectable');

        collect.setOrigin(0.5, 0.75);
        collect.play('collect');
        collect.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            collect.destroy();
        });
    },
    unlockRegions: function (unlockData) {
        var self = this;
        var regions = unlockData.regions;
        var camera = unlockData.camera;

        this.cameras.main.stopFollow();

        async function onCameraPositioned() {
            self.unlockSound.play();

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            for (var i = 0; i < regions.length; i++) {
                self.createUnlockAnimation(regions[i].x * 16 + 8, regions[i].y * 16 + 8);
                self.worldLayer.removeTileAt(regions[i].x, regions[i].y);
                await sleep(200);
            }

            self.tweens.add({
                targets: self.cameras.main,
                duration: 1000,
                ease: 'Sine.easeInOut',
                scrollX: self.player.x - self.cameras.main.width / 2,
                scrollY: self.player.y - self.cameras.main.height / 2,
                onComplete: function () {
                    self.cameras.main.startFollow(self.player, true);
                },
            });
        }

        this.tweens.add({
            targets: this.cameras.main,
            duration: 1000,
            ease: 'Sine.easeInOut',
            scrollX: camera.x * 16 - this.cameras.main.width / 2,
            scrollY: camera.y * 16 + 8 - this.cameras.main.height / 2,
            onComplete: onCameraPositioned,
        });

    },
    setUnlockedRegions: function (regions) {
        for (var i = 0; i < regions.length; i++) {
            this.worldLayer.removeTileAt(regions[i].x, regions[i].y);
        }
    }
});

var GameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    background: null,
    game_over_background: null,
    restart_btn: null,
    main_menu_btn: null,
    score_text: null,
    initialize: function GameOver() {
        Phaser.Scene.call(this, {key: 'game_over'});
    },
    preload: function () {
        this.load.image('background', 'assets/environment/back.png');
        this.load.image('game-over-background', 'assets/menu/game-over-back.png');
        this.load.image('restart-btn', 'assets/menu/restart-btn.png');
        this.load.image('main-menu-btn', 'assets/menu/game-over-exit-btn.png');
        this.load.audio('menu_background', 'assets/sound/menu_background.mp3');
    },
    create: function () {
        this.menuBackgroundMusic = this.sound.add('menu_background', {
            loop: true,
            volume: 0.50,
        });
        this.menuBackgroundMusic.play();

        this.background = this.add.tileSprite(config.scale.width / 2, config.scale.height / 2, config.scale.width, config.scale.height, 'background');
        this.game_over_background = this.add.image(config.scale.width / 2, config.scale.height / 2, 'game-over-background');
        this.restart_btn = this.add.image(config.scale.width / 2 - 40, 140, 'restart-btn').setInteractive();
        this.main_menu_btn = this.add.image(config.scale.width / 2 + 40, 140, 'main-menu-btn').setInteractive();
        this.score_text = this.add.text(config.scale.width / 2, config.scale.height / 2 - 5, 'Score: ' + score);
        this.score_text.setColor('#ffea49');
        this.score_text.setOrigin(0.5, 0.5);
        this.score_text.setFontSize(22);

        this.restart_btn.on('pointerdown', this.restartGame, this);
        this.main_menu_btn.on('pointerdown', this.goToMainMenu, this);

        this.game_over_background.scaleX = 0.3;
        this.game_over_background.scaleY = 0.3;

        this.restart_btn.scaleX = 0.3;
        this.restart_btn.scaleY = 0.3;

        this.main_menu_btn.scaleX = 0.3;
        this.main_menu_btn.scaleY = 0.3;
    },
    update: function (time, delta) {
        this.background.tilePositionX += delta * 0.02;
    },
    restartGame: function () {
        this.menuBackgroundMusic.stop();

        this.scene.start('game');
    },
    goToMainMenu: function () {
        this.menuBackgroundMusic.stop();

        this.scene.start('boot');
    }
});

var queryString = window.location.search;

var urlParams = new URLSearchParams(queryString);

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [Boot, Game, GameOver],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        width: 288,
        height: 192
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: null !== urlParams.get('debug'),
        }
    },
    pixelArt: true
};

var game = new Phaser.Game(config);