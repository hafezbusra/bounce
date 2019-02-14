Chase.MainMenu=function(game) {};

Chase.MainMenu.prototype={
create: function(){
		var title = this.add.sprite(this.world.width*0.5, (this.world.height-100)*0.5, 'title');
		title.anchor.set(0.5);
		title.scale.setTo(0.5,0.5);
		var highscore = 0;

		var buttonStart = this.add.button(this.world.width-20, this.world.height-20, 'button-start', this.clickStart, this, 1, 0, 2);
		buttonStart.anchor.set(1);
		buttonStart.scale.setTo(0.5,0.5);

		this.buttonAudio = this.add.button(this.world.width-20, 20, 'button-audio', this.clickAudio, this, 1, 0, 2);
		this.buttonAudio.anchor.set(1,0);
		this.buttonAudio.scale.setTo(0.5,0.5);

		var buttonAchievements = this.add.button(20, this.world.height-20, 'button-achievements', this.clickAchievements, this, 1, 0, 2);
		buttonAchievements.anchor.set(0,1);
		buttonAchievements.scale.setTo(0.5,0.5);

		var fontHighscore = { font: "32px Arial", fill: "#000" };
		var textHighscore = this.add.text(this.world.width*0.5, this.world.height-150, 'Highscore: '+highscore, fontHighscore);
		textHighscore.anchor.set(0.5,1);
		textHighscore.scale.setTo(0.5,0.5);

		buttonStart.x = this.world.width+buttonStart.width+20;
		this.add.tween(buttonStart).to({x: this.world.width-20}, 500, Phaser.Easing.Exponential.Out, true);
		this.buttonAudio.y = -this.buttonAudio.height-20;
		this.add.tween(this.buttonAudio).to({y: 20}, 500, Phaser.Easing.Exponential.Out, true);
		buttonAchievements.y = this.world.height+buttonAchievements.height+20;
		this.add.tween(buttonAchievements).to({y: this.world.height-20}, 500, Phaser.Easing.Exponential.Out, true);

		this.camera.flash(0x000000, 500, false);
},

	clickAudio: function() {

	},

	clickStart: function() {
		this.camera.fade(0x000000, 200, false);
		this.time.events.add(200, function() {
			this.game.state.start('Story');
		}, this);
	},
	clickAchievements: function() {
		this.game.state.start('Achievements');
	}

};