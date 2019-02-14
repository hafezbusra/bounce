var Chase = {};
var game = new Phaser.Game(320, 480, Phaser.AUTO);
var states = {
		'Boot': Chase.Boot,
		'Preloader': Chase.Preloader,
		'MainMenu': Chase.MainMenu,
		'Achievements': Chase.Achievements,
		'Story': Chase.Story,
		'Game': Chase.Game
};
for(var state in states){
	game.state.add(state, states[state]);
    }
	game.state.start('Boot');