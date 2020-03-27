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
    },
    create: function () {
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
        this.scene.start('game');
    }
});

var Game = new Phaser.Class({
    Extends: Phaser.Scene,
    socket: null,
    player: null,
    cursors: null,
    worldLayer: null,
    skyLayer: null,
    bushesLayer: null,
    backgroundLayer: null,
    spikesLayer: null,
    otherPlayers: null,
    eagle: null,
    initialize: function Game() {
        Phaser.Scene.call(this, {key: 'game'});
    },
    preload: function () {
        this.load.tilemapTiledJSON('map', 'assets/environment/map.json');
        this.load.spritesheet('props', 'assets/environment/props.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('tileset', 'assets/environment/tileset.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('middle', 'assets/environment/middle.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('wallpaper', 'assets/environment/back.png', {frameWidth: 16, frameHeight: 16});
        this.load.atlas('player', 'assets/player/player.png', 'assets/player/player.json');
        this.load.atlas('eagle', 'assets/eagle/eagle.png', 'assets/eagle/eagle.json');
        this.load.atlas('enemy_death', 'assets/enemy_death/enemy_death.png', 'assets/enemy_death/enemy_death.json');
    },
    create: function () {
        var self = this;
        this.socket = io();
        this.otherPlayers = this.physics.add.group();

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
        });

        var map = this.make.tilemap({ key: 'map' });
        this.spawnPoint = map.findObject("Objects", obj => obj.name === "Player Spawn Point");
        var middle = map.addTilesetImage('middle');
        var props = map.addTilesetImage('props');
        var tileset = map.addTilesetImage('tileset');
        var wallpaper = map.addTilesetImage('wallpaper');

        this.skyLayer = map.createDynamicLayer('Sky', [middle, props, tileset, wallpaper]);
        this.bushesLayer = map.createDynamicLayer('Bushes', [middle, props, tileset, wallpaper]);
        this.backgroundLayer = map.createDynamicLayer('Background', [middle, props, tileset, wallpaper]);
        this.spikesLayer = map.createDynamicLayer('Spikes', [middle, props, tileset, wallpaper]);
        this.worldLayer = map.createDynamicLayer('World', [middle, props, tileset, wallpaper]);

        this.worldLayer.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = this.worldLayer.width;
        this.physics.world.bounds.height = this.worldLayer.height;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player', {prefix: 'player-idle-', start: 1, end: 4, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player', {prefix: 'player-run-', start: 1, end: 6, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player', {prefix: 'player-jump-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNames('player', {prefix: 'player-crouch-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNames('player', {prefix: 'player-hurt-', start: 1, end: 2, zeroPad: 1}),
            frameRate: 6,
            repeat: -1
        });

        this.eagle = this.physics.add.sprite(100, 203, 'eagle');
        this.eagle.setCollideWorldBounds(true);
        this.eagle.setVelocityY(-50);
        this.physics.add.collider(this.worldLayer, this.eagle);

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNames('eagle', {prefix: 'eagle-attack-', start: 1, end: 4, zeroPad: 1}),
            frameRate: 7,
            repeat: -1
        });

        this.eagle.anims.play('fly', true);

        this.eagle.body.allowGravity = false;

        this.eagle.body.immovable = true;
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
            this.player.body.setSize(15, 16);
            this.player.body.setOffset(9, 15);
        } else {
            this.player.body.setSize(15, 19);
            this.player.body.setOffset(9, 12);
        }

        if (this.cursors.left.isDown) {
            if (isOnFloor && !shouldCrouch) {
                this.player.anims.play('run', true);
            }

            this.player.body.setVelocityX(-movementSpeed);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            if (isOnFloor && !shouldCrouch) {
                this.player.anims.play('run', true);
            }

            this.player.body.setVelocityX(movementSpeed);
            this.player.flipX = false;
        } else if (isOnFloor) {
            if (!shouldCrouch && !this.player.isHurt) {
                this.player.anims.play('idle', true);
            }

            this.player.setVelocityX(0);
        }

        if (shouldJump && isOnFloor) {
            this.player.anims.play('jump', true);
            this.player.body.setVelocityY(-450);
        } else if (shouldCrouch && isOnFloor) {
            this.player.anims.play('crouch', true);

            if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
                this.player.setVelocityX(0);
            }
        }

        if (this.player.isHurt) {
            this.player.anims.play('hurt', true);
        }

        if (this.eagle.body) {
            if (this.eagle.body.onCeiling()) {
                this.eagle.setVelocityY(50);
            } else if (this.eagle.body.onFloor()) {
                this.eagle.setVelocityY(-50);
            }

            this.eagle.setVelocityX(0);
        }
    },
    addPlayer: function (playerInfo) {
        var that = this;

        this.player = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(14, 19);
        this.player.body.setOffset(9, 12);

        this.physics.add.collider(this.worldLayer, this.player);
        this.cameras.main.startFollow(this.player, true);

        this.physics.add.overlap(this.player, this.eagle, function (player, eagle) {
            if (!player.isHurt && player.body.velocity.y > 0 && player.body.y < eagle.body.y) {
                that.createEnemyDeath(eagle.x, eagle.y);
                eagle.destroy();
                player.setVelocityY(-200);
            } else {
                player.anims.play('hurt', true);
                player.isHurt = true;

                setTimeout(function () {
                    player.isHurt = false;
                }, 750);
            }
        });
    },
    addOtherPlayer: function (playerInfo) {
        var otherPlayer = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'player');

        otherPlayer.setCollideWorldBounds(true);
        otherPlayer.body.setSize(14, 19);
        otherPlayer.body.setOffset(9, 12);
        otherPlayer.playerId = playerInfo.playerId;
        otherPlayer.anims.play(playerInfo.currentAnim.key, true);

        this.physics.add.collider(this.worldLayer, otherPlayer);

        this.otherPlayers.add(otherPlayer);
    },
    createEnemyDeath: function (x, y) {
        var enemyDeath = this.add.sprite(x, y, 'enemy_death');

        this.anims.create({
            key: 'enemy_death',
            frames: this.anims.generateFrameNames('enemy_death', {
                prefix: 'enemy-death-',
                start: 1,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 16,
            repeat: 0
        });

        enemyDeath.play('enemy_death');
        enemyDeath.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            enemyDeath.destroy();
        });
    },
});

var queryString = window.location.search;

var urlParams = new URLSearchParams(queryString);

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [/*Boot, */Game],
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