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
        alert('play with ' + character);
    }
});

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [Boot],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        width: 288,
        height: 192
    },
};

var game = new Phaser.Game(config);