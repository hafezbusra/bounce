var Chase={};
Chase.Boot = function(game){};
Chase.Boot.prototype = {
	preload: function(){
		this.stage.backgroundColor = '#DECCCC';
		this.load.image('loading-background', 'assets/img/loading-background.png');
		this.load.image('loading-progress', 'assets/img/loading-progress.png');
	},
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.state.start('Preloader');
	}
};