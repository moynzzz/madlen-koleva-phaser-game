var Boot = new Phaser.Class({
    Extends: Phaser.Scene,
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
        this.background = this.add.tileSprite(config.width / 2, config.height / 2, config.width, config.height, 'background');

        this.menu_background = this.add.image(config.width / 2, config.height / 2, 'menu-background');
        this.play_btn = this.add.image(config.width / 2, 70, 'play-btn').setInteractive();
        this.options_btn = this.add.image(config.width / 2, 100, 'options-btn').setInteractive();
        this.exit_btn = this.add.image(config.width / 2, 130, 'exit-btn').setInteractive();

        this.player1 = this.add.image(config.width / 2 - 40, 145, 'player1');
        this.player2 = this.add.image(config.width / 2 + 40, 145, 'player2');

        this.menu_overlay = this.add.graphics().setVisible(false);
        this.menu_overlay.fillRect(0, 0, config.width, config.height, 0x000000);
        this.menu_overlay.fillStyle(0x000000, 0.3);

        this.options_background = this.add.image(config.width / 2, config.height / 2, 'options-background').setVisible(false);

        this.champion_select_background = this.add.image(config.width / 2, config.height / 2, 'champion-select-background').setVisible(false);
        this.yannie_btn = this.add.image(config.width / 2 + 20, config.height / 2 - 10, 'yannie-btn').setVisible(false).setInteractive();
        this.brannie_btn = this.add.image(config.width / 2 + 20, config.height / 2 + 25, 'brannie-btn').setVisible(false).setInteractive();
        this.yannie_image = this.add.image(config.width / 2 - 40, config.height / 2 - 15, 'player2').setVisible(false);
        this.brannie_image = this.add.image(config.width / 2 - 35, config.height / 2 + 15, 'player1').setVisible(false);

        this.close_btn = this.add.image(config.width / 2, 152, 'close-btn').setVisible(false).setInteractive();

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
        window.location = './index.html';
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
        // alert('play with ' + character);
        this.scene.start('game');
    }
});

var Game = new Phaser.Class({
    Extends: Phaser.Scene,
    player: null,
    cursors: null,
    groundLayer: null,
    initialize: function Game() {
        Phaser.Scene.call(this, {key: 'game', active: true});
    },
    preload: function () {
        this.load.tilemapTiledJSON('map', 'assets/environment/map.json');
        this.load.spritesheet('props', 'assets/environment/props.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('tileset', 'assets/environment/tileset.png', {frameWidth: 16, frameHeight: 16});
        this.load.atlas('player', 'assets/player/player.png', 'assets/player/player.json');
    },
    create: function () {
        var map = this.make.tilemap({key: 'map'});
        var props = map.addTilesetImage('props');
        var tileset = map.addTilesetImage('tileset');

        this.groundLayer = map.createDynamicLayer('World', [tileset, props], 0, 0);
        this.groundLayer.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        this.player = this.physics.add.sprite(150, 175, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(14, 19);
        this.player.body.setOffset(9, 12);

        this.physics.add.collider(this.groundLayer, this.player);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
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
    },
    update: function (time, delta) {
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
            if (!shouldCrouch) {
                this.player.anims.play('idle', true);
            }

            this.player.setVelocityX(0);
        }

        if (shouldJump && isOnFloor) {
            this.player.anims.play('jump', true);
            this.player.body.setVelocityY(-500);
        } else if (shouldCrouch && isOnFloor) {
            this.player.anims.play('crouch', true);

            if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
                this.player.setVelocityX(0);
            }
        }
    },
});

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [/*Boot, */Game],
    parent: 'game',
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
            gravity: {y: 1000},
            debug: true
        }
    },
    pixelArt: true
};

var game = new Phaser.Game(config);