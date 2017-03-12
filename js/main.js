'use strict';

const utils = {
	randomDieFace() {
		let rand = this.randomNumber(6,1);
		if (rand === 6) rand = 1; // since there are 2 shoes, if second is chosen, reasign to 1
		return rand;
	},
	randomNumber(max, min = 0) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	findAvailableSlot(array, el = 'x') {
		for (let i = 0; i < array.length; i++) {
			if (!array[i]) {
				array[i] = el;
				return i;
			}
		}
		console.log('No available slot.');
		return null;
	},
	findRegularDieSlot(array) {
		for (let i = 0; i < array.length; i++) {
			if (array[i].frame !== 5) return i;
		}
		return null;
	},
	print(message) {
		console.log(message);
		$('#log').prepend(`<li>${message}</li>`);
	}
};

var GameInstance = function() {

	this.game = new Phaser.Game(810, 600, Phaser.AUTO, 'app', { 
		preload: this.preload.bind(this), 
		create: this.create.bind(this), 
		update: this.update.bind(this) 
	});

	this.pause = false;

	// Game Header Information
	this.header = {
		level: null,
		friends: null
	};

	this.currentLevel = {
		level: 1,
		time: 120,
		friends: 1
	};

	this.timer = {
		bar: null,
		on: false,
		size: 0,
		timer: null
	};

	// Player
	this.player = null;

	// Dice
	this.dice = null;
	this.tray = [];
	this.safeSlots = [];

	// Rooms
	this.currentRoom = null; // Game starts as the current room

	// This object holds all states for voice commands triggered by annyang
	this.voiceCommands = {
		up: false,
		right: false,
		down: false,
		left: false,
		save: false,
		roll: false,
		unsave: false,
		findRoom: false
	};

	this.sfx = {
		diceroll: null,
		savedie: null,
		unsavedie: null
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
	// Load sfx
	this.game.load.audio('diceroll', ['assets/sfx/dice-roll.mp3', 'assets/sfx/dice-roll.ogg']);
	this.game.load.audio('savedie', ['assets/sfx/save-dice.mp3', 'assets/sfx/save-die.ogg']);
	this.game.load.audio('unsavedie', ['assets/sfx/unsave-dice.mp3', 'assets/sfx/unsave-die.ogg']);
};

GameInstance.prototype.create = function() {
	// Set up background
	this.game.add.sprite(0,0, 'background');
	// Add Starting room
	var startingRoom = this.game.add.sprite(359.5, 224.5, 'room-start');
	// Add player sprite
	this.player = this.game.add.sprite(359.5, 224.5, 'player');
	// Add 5 dice
	for (let i = 0; i < 5; i++) {
		const die = this.game.add.sprite(460 + i * 67, 523, 'die');
		die.safe = false;
		this.tray.push(die);
	}
	// Create header information (level, friends number)
	this.header.level = this.game.add.text(16, 8, 'Level ' + this.currentLevel.level, { fontSize: '32px', fill: '#000'});
	this.header.friends = this.game.add.text(655, 8, 'Friends 0/' + this.currentLevel.friends, { fontSize: '32px', fill: '#000'});
	// Timer
	this.timer.bar = this.game.add.sprite(277, 11, 'timer');
	this.timer.bar.scale.setTo(0,1);
	/*this.timer.timer = this.game.timer.create(false);
	this.timer.timer.loop(1000, this.timer.update, this);
	this.timer.timer.start();*/
	// SFX
	this.sfx.diceroll = this.game.add.audio('diceroll');
	this.sfx.savedie = this.game.add.audio('savedie');
	this.sfx.unsavedie = this.game.add.audio('unsavedie');
};

GameInstance.prototype.update = function() {
	if (this.pause === true) return;

	// Reposition every dice
	this.tray.forEach((die, i) => {
		die.x = 460 + i * 67;
	});
	this.safeSlots.forEach((die, i) => {
		die.x = 19 + i * 67;
	});

	// Handles player movement
	if (this.voiceCommands.up) {
		this.player.y -= 90;
		this.voiceCommands.up = false;
	}
	else if (this.voiceCommands.down) {
		this.player.y += 90;
		this.voiceCommands.down = false;
	}
	else if (this.voiceCommands.left) {
		this.player.x -= 90;
		this.voiceCommands.left = false;
	}
	else if (this.voiceCommands.right) {
		this.player.x += 90;
		this.voiceCommands.right = false;
	}

	// Handls dice roll
	if (this.voiceCommands.roll) {
		this.sfx.diceroll.play();
		this.voiceCommands.roll = false;
		// Randomize all non-saved dice faces
		this.tray.forEach((die, index) => {
			die.frame = utils.randomDieFace();
		});
		// Check for TT/Shy
		for (let d = 0; d < this.tray.length; d++) {
			if (this.tray[d].frame === 5) {
				utils.print('Got T_T');
				const currentDie = this.tray.splice(d, 1);
				d--;
				// If there are still available slots on safeSlots array, add it
				if (this.safeSlots.length >= 4) {
					// If there are no available safeSlots, look for any regular dice
					let regularDie;
					for (let i = 0; i < this.safeSlots.length; i++) {
						if (this.safeSlots[i].frame !== 5) {
							regularDie = this.safeSlots.splice(i, 1);
							this.tray.push(regularDie[0]);
							break;
						}
					}
					if (!regularDie) {
						window.alert('GAME OVER'); //TO-DO: Return player to starting room
						utils.print('GAME OVER');
						this.pause = true;
						break;
					}
				}
				this.safeSlots.unshift(currentDie[0]);
			}
		}

		// If any tray die face is a crown/courage, unlock a sy/TT in safeSlots if possible
		for (let d = 0; d < this.tray.length; d++) {
			if (this.tray[d].frame === 4) {
				for (let i = 0; i < this.safeSlots.length; i++) {
					if (this.safeSlots[i].frame === 5) {
						const dieToReturn = this.safeSlots.shift();
						dieToReturn.frame = 0;
						this.tray[d].frame = 0;
						this.tray.push(dieToReturn);
						utils.print('Unlocked TT with Courage/Crown.');
						break;
					} 
				}
			}
		}
	}

	// Handles dice lock/save
	if (this.voiceCommands.save) {
		utils.print('Saved dice ' + this.voiceCommands.save);
		// Check if die is available to be saved
		let found;
		for (let i = 0; i < this.tray.length; i++) {
			const die = this.tray[i];
			if (die.frame === this.voiceCommands.save && this.safeSlots.length < 4) {
				const currentDie = this.tray.splice(i, 1);
				this.safeSlots.push(currentDie[0]);
				found = true;
				break;
			}
		}
		if (!found) utils.print('Die not available for saving.')
		else this.sfx.savedie.play();
		this.voiceCommands.save = false;
	}

	// Handles dice return to tray
	if (this.voiceCommands.unsave) {
		utils.print('Returned dice ' + this.voiceCommands.unsave);
		// Check if die is available to be returned
		let found;
		for (let i = 0; i < this.safeSlots.length; i++) {
			const die = this.safeSlots[i];
			if (die.frame === this.voiceCommands.unsave) {
				const currentDie = this.safeSlots.splice(i, 1);
				this.tray.push(currentDie[0]);
				found = true;
				break;
			}
		}
		if (!found) utils.print('Die not available for returning');
		else this.sfx.unsavedie.play();
		this.voiceCommands.unsave = false;
	}
};

// Annyang voice commands
if (annyang) {

	var commands = {
		'hello': function() {
			utils.print('Hi!');
		},
		'pause': function() {
			newGame.pause = !newGame.pause;
			utils.print('Pause', newGame.pause);
		},
		'move :direction': function(direction) {
			console.log('Voice Command: Move ' + direction);
			if (direction === 'up' || direction === 'north') newGame.voiceCommands.up = true;
			else if (direction === 'down' || direction === 'South') newGame.voiceCommands.down = true;
			else if (direction === 'left' || direction === 'west') newGame.voiceCommands.left = true;
			else if (direction === 'right' || direction === 'East') newGame.voiceCommands.right = true;
		},
		'roll': function() {
			console.log('Voice Command: Roll');
			newGame.voiceCommands.roll = true;
		},
		'save :face': function(face) {
			console.log('Voice Command: Save ' + face);
			if (face === 'boot' || face === 'shoe' || face === 'foot' || face === 'shoes' || face === 'shoot') newGame.voiceCommands.save = 1;
			if (face === 'hand' || face === 'glove' || face === 'him') newGame.voiceCommands.save = 2;
			if (face === 'door') newGame.voiceCommands.save = 3;
		},
		'return :face': function(face) {
			console.log('Voice Command: Return ' + face);
			if (face === 'boot' || face === 'shoe' || face === 'foot' || face === 'shoes' || face === 'shoot') newGame.voiceCommands.unsave = 1;
			if (face === 'hand' || face === 'glove' || face === 'him') newGame.voiceCommands.unsave = 2;
			if (face === 'door') newGame.voiceCommands.unsave = 3;
		}
	};

	annyang.addCommands(commands);

	annyang.start();
}

// Keyboard commands
$(document).keyup(function(e) {
	// Spacebar: Roll
	if (e.keyCode === 32) newGame.voiceCommands.roll = true;
	else if (e.keyCode === 38) newGame.voiceCommands.up = true;
	else if (e.keyCode === 39) newGame.voiceCommands.right = true;
	else if (e.keyCode === 40) newGame.voiceCommands.down = true;
	else if (e.keyCode === 37) newGame.voiceCommands.left = true;
	else if (e.keyCode === 49) newGame.voiceCommands.save = 1;
	else if (e.keyCode === 50) newGame.voiceCommands.save = 2;
	else if (e.keyCode === 51) newGame.voiceCommands.save = 3;
	else if (e.keyCode === 52) newGame.voiceCommands.unsave = 1;
	else if (e.keyCode === 53) newGame.voiceCommands.unsave = 2;
	else if (e.keyCode === 54) newGame.voiceCommands.unsave = 3;
});

let newGame;

$(document).ready(function() {
	newGame = new GameInstance();
});

