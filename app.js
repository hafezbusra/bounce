function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth * window.devicePixelRatio;
    var windowHeight = window.innerHeight * window.devicePixelRatio;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
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

var life = 100;
var timeFinish = 100;
var game = new Phaser.Game(config);

    var up = false;
    var player;
    var enemy;
    tilemovement = false
    var flip = -2;
    var eflip = 2;
    alive = true
    var create = true
    brick = 15

function preload() {
    this.timeInSeconds = 0;
    var time = this.time.now;

    this.load.audio('Gameplay', [
        'assets/new/sound/Gameplay.mp3'
    ]);
    this.load.image('bg', 'assets/new/blueBG.png');
    this.load.image('bgImage', 'assets/new/bg.png');
    this.load.image('bars', 'assets/new/bars.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('key', 'assets/new/Key.png');
    this.load.image('ground', 'assets/new/ground.png');
    this.load.image("spawn", "assets/new/spawn.png");
    this.load.image('ball', 'assets/new/ball.png');
    this.load.image('spikes', 'assets/new/top.png');
    this.load.image('heart', 'assets/new/heart.png');
    this.load.image('ledge', 'assets/new/ledge.png');
    this.load.image('tile2', 'assets/new/jjj.png');
    this.load.image('enemy', 'assets/new/redBall.png');
    this.load.image("sensor", "assets/new/sensor.png");
    this.load.spritesheet("wave", "assets/new/animations/Water.png", { frameWidth: 309, frameHeight: 357 });
}

function create() {
    camera = this.cameras.main
    camera.setBounds(0, 100, 7100, 1220);
    this.matter.world.setBounds(0, 0, 7100, 1220);
    star = this.matter.add.sprite(3600, 650, 'star', null, { isStatic: true, isSensor: true, label: "star" }).setScale(2);
    key = this.matter.add.sprite(7080, 240, 'key', null, { isStatic: true, isSensor: true, label: "key" }).setScale(0.25);
    this.add.tileSprite(1200, 650, 2560, 1220, 'bg').setDepth(-2);
    this.add.tileSprite(3600, 650, 2560, 1220, 'bg').setDepth(-2);
    this.add.tileSprite(6000, 650, 2560, 1220, 'bg').setDepth(-2);


    this.anims.create({
        key: 'waves',
        frames: this.anims.generateFrameNumbers('wave', { start: 0, end: 15 }),
        frameRate: 16,
        repeat: -1
    });
    wave = this.matter.add.sprite(50, 1150, null, { isStatic: true, label: "wave" }).setScale(3000,1).setDepth(-1);
    wave.anims.play("waves", true);

    //player 50
    player = this.matter.add.sprite(300, 0, 'ball', null, { isStatic: false, label: "player" }).setScale(0.5);
    player.setFriction(0.0);
    player.setDepth(10); 
    player.setFixedRotation(true)

    powerup = [];
    powerup.push(star.body);

    tiles = [];
    tiles.push((this.matter.add.sprite(300, 820, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(1000, 820, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(1300, 560, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(1800, 960, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(2500, 560, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(3300, 760, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(4000, 560, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(4500, 360, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(5000, 560, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(5300, 300, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(5800, 500, 'tile2', null, { isStatic: true, label: "tile-move" })).setScale(0.5).body);
    tiles.push((this.matter.add.sprite(7000, 300, 'tile2', null, { isStatic: true, label: "tile" })).setScale(0.5).body);
    
    this.matter.add.sprite(2500, 860, 'tile2', null, {  isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.5);
    this.matter.add.sprite(2500, 360, 'tile2', null, {  isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.5);
    this.matter.add.sprite(3300, 960, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.5);
    this.matter.add.sprite(3300, 560, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.5);
    this.matter.add.sprite(4000, 760, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.5);
    this.matter.add.sprite(4000, 360, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.5);

    enemy = [];
    enemy.push((this.matter.add.sprite(1000, 450, 'enemy', null, { isStatic: true, label: "enemy1" })).setScale(0.5).body);
    enemy.push((this.matter.add.sprite(1550, 700, 'enemy', null, { isStatic: true, label: "enemy" })).setScale(0.5).body);
    enemy.push((this.matter.add.sprite(2850, 700, 'enemy', null, { isStatic: true, label: "enemy" })).setScale(0.5).body);

    this.matter.add.sprite(800, 450, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.1)
    this.matter.add.sprite(1200, 450, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.1)
    this.matter.add.sprite(1350, 700, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.1)
    this.matter.add.sprite(1850, 700, 'tile2', null, { isSensor: true, label: "turn" }).setIgnoreGravity(true).setAlpha(0).setScale(0.1)

    cursors = this.input.keyboard.createCursorKeys();
    camera.startFollow(player, true, 0.08, 0.08);
    camera.setZoom(1);
    hud = this.add.text(0, 0, 'Progress: 0%', { color: '#00ff00' });

    sensor = this.matter.add.sprite(0, 0, 'sensor', null, { isSensor: true, label: "sensor", vertices:[{x:0,y:0},{x:0,y:1},{x:50,y:1},{x:50,y:0}] }).setScale(1.17);

    music = this.sound.add('Gameplay', { volume: 0.5 });
    music.loop = true
    music.play();


    
    this.matterCollision.events.on("paircollisionstart", function (event) {
        if (event.bodyA.label == "star" && event.bodyB.label == "player") {
            event.gameObjectA.destroy();
        }
        else if (event.bodyA.label == "key" && event.bodyB.label == "player") {
            event.gameObjectA.destroy();
            alive = false
            console.log('you win')
            
        }
        else if (event.bodyB.label == "turn" && event.bodyA.label == "tile") {
            flip = flip * -1;

        }
        else if (event.bodyA.label == "turn" && event.bodyB.label == "tile") {
            flip = flip * -1;

        }
        else if (event.bodyB.label == "turn" && event.bodyA.label == "enemy1") {
            eflip = eflip * -1;

        }
        else if (event.bodyA.label == "turn" && event.bodyB.label == "enemy1") {
            eflip = eflip * -1;

        }
        else if (event.bodyA.label == "player" && event.bodyB.label == "tile-move") {
            tilemovement = true
        }
    });

    this.add
        .text(200, 50, "Time Left:", {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        })
        .setScrollFactor(0);
    this.add
        .text(200, 100, "Brick Left:", {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        })
        .setScrollFactor(0);
}

function putPlatform() {
    create = true
    console.log('ho')
}

function update() {
    if(alive){
        /*
        //subtract a second
        //find how many complete minutes are left
        //find the number of seconds left
        //not counting the minutes
        var seconds = Math.ceil(this.time.now /1000);
        //make a string showing the time
        var timeString = seconds + 'seconds';

        this.add
        .text(260, 50, timeString, {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        })
        .setScrollFactor(0);

        */
        this.add
        .text(350,100, brick, {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        })
            .setScrollFactor(0);

        sensor.y = player.y + 40;
        sensor.x = player.x;
        

        Phaser.Physics.Matter.Matter.Body.translate(tiles[4], { x: 0, y: flip })
        Phaser.Physics.Matter.Matter.Body.translate(tiles[5], { x: 0, y: flip })
        Phaser.Physics.Matter.Matter.Body.translate(tiles[6], { x: 0, y: flip })
        Phaser.Physics.Matter.Matter.Body.translate(enemy[0], { x: eflip, y: 0 })
        Phaser.Physics.Matter.Matter.Body.translate(enemy[1], { x: eflip, y: 0 })

        if (player.y > 1000) {
            alive = false
            const cam = this.cameras.main;
            cam.shake(100, 0.05);
            cam.fade(250, 0, 0, 0);
            afterDeath()
        }

        if (tilemovement == true) {
            Phaser.Physics.Matter.Matter.Body.translate(tiles[10], { x: 2, y: 0 })
        }

        var collision = Phaser.Physics.Matter.Matter.Query.collides(sensor.body, tiles)
        if (collision.length > 0) {
            up = true;
            player.setVelocityY(-6)

        } else {
            up = false;
            player.setFriction(0.0);
        }

        

        var collision = Phaser.Physics.Matter.Matter.Query.collides(player.body, powerup)
        if (collision.length > 0) {
            up = true;
            player.setVelocityY(-3)
            if (collision[0].bodyB.label == 'star') {
                Phaser.Physics.Matter.Matter.Body.setStatic(collision[0].bodyB, false)
            }
        }

        //hit enemy
        var collision = Phaser.Physics.Matter.Matter.Query.collides(player.body, enemy)
        if (collision.length > 0) {
            alive = false
            const cam = this.cameras.main;
            cam.shake(100, 0.05);
            cam.fade(250, 0, 0, 0);
            afterDeath()
        }

        if (cursors.up.isDown && up) {
            player.setVelocityY(-14);
            up = true;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-9);
        }
        if (cursors.right.isDown) {
            player.setVelocityX(9);
        }

        if (cursors.left.isUp && cursors.right.isUp) {
            player.setVelocityX(0)
        }

        if (create == true && this.game.input.activePointer.isDown) {
            if(brick >0){
                create = false
                tiles.push((this.matter.add.sprite(this.cameras.main.scrollX + this.game.input.activePointer.x, this.cameras.main.scrollY + this.game.input.activePointer.y, 'ground', null, { isStatic: true, label: "ground" })).setScale(0.25).body);
                this.time.delayedCall(300, putPlatform, [], this)
                brick--
            }       
        }

    }
    
}
function afterDeath() {
    
}

$(function () {
    window.addEventListener("resize", resize, false);
    $('canvas').bind('contextmenu', function (e) {
        return false;
    });
    resize();
});
