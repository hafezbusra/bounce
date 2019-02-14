Chase.Game=function(game) {
var cursors;
var player;
var police;
var leftB;
var rightB;};
Chase.Game.prototype={

create: function() {
game.physics.startSystem(Phaser.Physics.ARCADE);

var grass=this.add.sprite((this.world.width)*0.5,(this.world.height)*0.5,"background");
grass.anchor.setTo(0.5);
var road=this.add.sprite(62,0,"road");
leftB=this.add.sprite(30,0,"leftBump");
rightB=this.add.sprite(258,0,"rightBump");

cursors = game.input.keyboard.createCursorKeys();


//  Add physics system
game.physics.enable(leftB,Phaser.Physics.ARCADE);
game.physics.enable(rightB,Phaser.Physics.ARCADE);


player=this.add.sprite((this.world.width)*0.5,(this.world.height)*0.5,"player");
player.anchor.setTo(0.5);
game.physics.enable(player,Phaser.Physics.ARCADE)

police=this.add.sprite((this.world.width)*0.5,(this.world.height+300)*0.5,"police");
police.anchor.setTo(0.5);
game.physics.enable(police,Phaser.Physics.ARCADE)
},

update: function() {
	    game.physics.arcade.collide(player,leftB);
		game.physics.arcade.collide(player,rightB);
		if (cursors.left.isDown)
        {
            player.x -= 5;
        }
        else if (cursors.right.isDown)
        {
            player.x += 5;
        }
}

};