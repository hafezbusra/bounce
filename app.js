var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    },
    physics: {
        default: "matter",
        matter: {
            //debug: true
        }
    }
};

var game = new Phaser.Game(config);

    var up = false;
    var player;
    var enemy;
    enemymovement = true

function preload() {
    this.load.image('bg', 'assets/new/blueBG.png');
    this.load.image('bgImage', 'assets/new/bg.png');
    this.load.image('bars', 'assets/new/bars.png');
    this.load.image('ground', 'assets//new/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('ball', 'assets/new/ball.png');
    this.load.image('spikes', 'assets/new/top.png');
    this.load.image('heart', 'assets/new/heart.png');
    this.load.image('ledge', 'assets/new/ledge.png');
    this.load.image('tile2', 'assets/new/tile2.png');

    this.load.spritesheet("enemy", "assets/new/enemy.png", { frameWidth: 146, frameHeight: 75 });

}

function create() {
    camera = this.cameras.main
    camera.setBounds(0, 100, 3840, 820);
    this.matter.world.setBounds(0, 0, 3840, 1220);

    star = this.matter.add.sprite(3600, 650, 'star', null, { isStatic: true, isSensor: true, label: "star" }).setScale(2);

    this.add.tileSprite(1200, 650, 2560, 1220, 'bg');
    this.add.tileSprite(3600, 650, 2560, 1220, 'bg');
    this.add.tileSprite(0, 1420, 2560, 1220, 'ground').setScale(2560, 1).setDepth(20);

    player = this.matter.add.sprite(50, 0, 'ball', null, { isStatic: false, label: "player" }).setScale(0.5);
    player.setFriction(1)
    player.setDepth(10); 
    player.setFixedRotation(true)
    powerup = [];
    powerup.push(star.body);

    tiles = [];
    tiles.push((this.matter.add.sprite(300, 820, 'tile2', null, { isStatic: true, label: "tile" })).setScale(25, 12).body);
    tiles.push((this.matter.add.sprite(1500, 820, 'tile2', null, { isStatic: true, label: "tile" })).setScale(20, 12).body);
    tiles.push((this.matter.add.sprite(3085, 820, 'tile2', null, { isStatic: true, label: "tile" })).setScale(45, 12).body);
    //tiles.push((this.matter.add.sprite(3435, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(25,12).body);
    tiles.push((this.matter.add.sprite(400, 630, 'tile2', null, { isStatic: true, label: "tile" })).setScale(1, 7).body);
    tiles.push((this.matter.add.sprite(700, 450, 'tile2', null, { isStatic: true, label: "tile-up" })).setScale(5, 2).body);
    tiles.push((this.matter.add.sprite(1500, 380, 'tile2', null, { isStatic: true, label: "tile" })).setScale(16, 2).body);
    tiles.push((this.matter.add.sprite(2050, 480, 'tile2', null, { isStatic: true, label: "tile-trap" })).setScale(5, 2).body);
    tiles.push((this.matter.add.sprite(2300, 630, 'tile2', null, { isStatic: true, label: "tile" })).setScale(1, 7).body);

    cursors = this.input.keyboard.createCursorKeys();
    camera.startFollow(player, true, 0.08, 0.08);
    camera.setZoom(1);

    //music = this.sound.add('soundtrack', { volume: 0.5 });
    //music.loop = true
    //music.play();

    this.matterCollision.events.on("paircollisionstart", function (event) {
        if (event.bodyA.label == "star" && event.bodyB.label == "player") {
            event.gameObjectA.destroy();
        }
    });

    enemy = [];
    enemy.push((this.matter.add.sprite(2735, 400, 'enemy', null, { isSensor: true, isStatic: true, label: "enemy-left" }).setAlpha(0)).setScale(1).body);
    enemy.push((this.matter.add.sprite(3135, 400, 'enemy', null, { isSensor: true, isStatic: true, label: "enemy-right" }).setAlpha(0)).setScale(1).body);
    enemy.push((this.matter.add.sprite(2535, 600, 'enemy', null, { isSensor: true, isStatic: true, label: "enemy-left" }).setAlpha(0)).setScale(1).body);
    enemy.push((this.matter.add.sprite(2935, 600, 'enemy', null, { isSensor: true, isStatic: true, label: "enemy-right" }).setAlpha(0)).setScale(1).body);

    enemyone = this.matter.add.sprite(2935, 400, 'enemy', null, { isSensor: false, isStatic: false, label: "enemy-one" }).setScale(1);
    enemytwo = this.matter.add.sprite(2735, 600, 'enemy', null, { isSensor: false, isStatic: false, label: "enemy-two" }).setScale(1);
  
    //enemy.setFixedRotation(true);
}

function update() {
    enemyone.y = 400
    enemytwo.y = 600
    if(enemymovement == true){
        enemyone.setVelocityX(-3)
        enemytwo.setVelocityX(3)
    }
    
    var collision = Phaser.Physics.Matter.Matter.Query.collides(player.body, tiles)
    if (collision.length > 0) {
        up = true;
        player.setVelocityY(-6)
        if(collision[0].bodyB.label == 'tile-up'){
            Phaser.Physics.Matter.Matter.Body.translate(collision[0].bodyB, { x: 0, y: -5 })
        }
        if (collision[0].bodyB.label == 'tile-trap') {
            Phaser.Physics.Matter.Matter.Body.setStatic(collision[0].bodyB,false)
        }
    } else if (Math.abs(Math.floor(player.body.velocity.y)) > 1) {
        up = false;
    }

    var collision = Phaser.Physics.Matter.Matter.Query.collides(player.body, powerup)
    if (collision.length > 0) {
        up = true;
        player.setVelocityY(-3)
        if (collision[0].bodyB.label == 'star') {
            Phaser.Physics.Matter.Matter.Body.setStatic(collision[0].bodyB, false)
        }
    }

    //enemy movement

    var collisionEnemy = Phaser.Physics.Matter.Matter.Query.collides(enemyone.body, enemy)
    if (collisionEnemy.length > 0) {
        enemymovement = false
        if (collisionEnemy[0].bodyA.label == 'enemy-left') {
            enemyone.setVelocityX(3)
            enemytwo.setVelocityX(-3)
        }
        if (collisionEnemy[0].bodyA.label == 'enemy-right') {
            enemyone.setVelocityX(-3)
            enemytwo.setVelocityX(3)
        }

    }

    if (cursors.up.isDown && up) {
        player.setVelocityY(-14);
        up = true
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-9);
    }
    if (cursors.right.isDown) {
        player.setVelocityX(9);
    }


}
