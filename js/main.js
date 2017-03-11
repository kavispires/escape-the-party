'use strict';

var GameInstance = function() {

	this.game = new Phaser.Game(810, 600, Phaser.AUTO, 'app', { 
		preload: this.preload.bind(this), 
		create: this.create.bind(this), 
		update: this.update.bind(this) 
	});

	this.pause = false;

	// Game Header Information
	this.currentLevel = {
		level: 1,
		time: 60,
		friends: 1
	};

	this.timer = {
		bar: null,
		on: false,
		size: 0
	};

	this.player = null;
	this.map = [];

	this.dice = null;

	// This object holds all states for voice commands triggered by annyang
	this.voiceCommands = {
		up: false,
		right: false,
		down: false,
		left: false
	};
};

GameInstance.prototype.preload = function() {
	// Load background
	this.game.load.image('background', 'assets/background.png');
	// Load rooms
	this.game.load.image('room-start', 'assets/room-start.png');
	this.game.load.image('room-exit', 'assets/room-exit.png');
	this.game.load.image('room-1door', 'assets/room-1door.png');
	this.game.load.image('room-2door', 'assets/room-2door.png');
	this.game.load.image('room-2Ldoor', 'assets/room-2Ldoor.png');
	this.game.load.image('room-3door', 'assets/room-3door.png');
	this.game.load.image('room-4door', 'assets/room-4door.png');
	// Load elements
	this.game.load.image('player', 'assets/player.png');
	this.game.load.image('friend', 'assets/friend.png');
	this.game.load.image('crush', 'assets/crush.png');
	// Load die
	this.game.load.spritesheet('die', 'assets/die.png', 60, 60);
	// Load time bar
	this.game.load.image('timer', 'assets/time-bar.png');
};

GameInstance.prototype.create = function() {
	// Set up background
	this.game.add.sprite(0,0, 'background');
	// Add Starting room
	var startingRoom = this.game.add.sprite(359.5, 224.5, 'room-start');
	// Add player sprite
	this.player = this.game.add.sprite(359.5, 224.5, 'player');
	// Add 5 dice
	this.dice = this.game.add.group();
	for (let i = 0; i < 5; i++) {
		const die = this.dice.create(460 + i * 67, 523, 'die');
	}
	// Create header information (level, friends number)
	this.game.add.text(16, 8, 'Level ' + this.currentLevel.level, { fontSize: '32px', fill: '#000'});
	this.game.add.text(655, 8, 'Friends 0/' + this.currentLevel.friends, { fontSize: '32px', fill: '#000'});
	this.timer.bar = this.game.add.sprite(277, 11, 'timer');
	this.timer.bar.scale.setTo(1,1);
};

GameInstance.prototype.update = function() {
	if (this.pause === true) return;
	// Handles player movement
	if (this.voiceCommands.up) {
		this.player.y -= 90;
		this.voiceCommands.up = false;
	}
	if (this.voiceCommands.down) {
		this.player.y += 90;
		this.voiceCommands.down = false;
	}
	if (this.voiceCommands.left) {
		this.player.x -= 90;
		this.voiceCommands.left = false;
	}
	if (this.voiceCommands.right) {
		this.player.x += 90;
		this.voiceCommands.right = false;
	}
};

// Start annyang voice commands
if (annyang) {

	var commands = {
		'hello': function() {
			console.log('Hi!');
		},
		'pause': function() {
			newGame.pause = !newGame.pause;
			console.log('Pause', newGame.pause);
		},
		'move :direction': function(direction) {
			console.log('move', direction);
			if (direction === 'up' || direction === 'north') newGame.voiceCommands.up = true;
			else if (direction === 'down' || direction === 'South') newGame.voiceCommands.down = true;
			else if (direction === 'left' || direction === 'west') newGame.voiceCommands.left = true;
			else if (direction === 'right' || direction === 'East') newGame.voiceCommands.right = true;
		}
	};

	annyang.addCommands(commands);

	annyang.start();
}

var newGame = new GameInstance();