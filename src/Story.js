Chase.Story = function(game) {};
Chase.Story.prototype = {
	create: function(){
		var textStory = this.add.text(100, 75, 'Story screen', { font: "32px Arial", fill: "#000" });
		var buttonContinue = this.add.button(this.world.width-20, game.world.height-20, 'button-continue', this.clickContinue, this, 1, 0, 2);
		textStory.scale.setTo(0.7,0.7);
		
		buttonContinue.anchor.set(1,1);
		buttonContinue.scale.setTo(0.5,0.5);
		buttonContinue.x = this.world.width+buttonContinue.width+20;
		
		this.add.tween(buttonContinue).to({x: this.world.width-20}, 500, Phaser.Easing.Exponential.Out, true);

		//this.camera.flash(0x000000, 500, false);
	},
	clickContinue: function() {
		this.camera.fade(0x000000, 200, false);
		this.camera.onFadeComplete.add(function(){
			this.game.state.start('Game');
		}, this);
	}
};