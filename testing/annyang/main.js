'use strict';

var $app = $('#app');

if (annyang) {

	console.log('annyang found!');

	var commands = {
		'hello': function() {
			alert('Hello to you too!');
		},
		'where are you': function() {
			console.log('I\'m right here');
		},
		'roll': function() {
			printResponse('Rolling dice...')
		},
		'bye': function() {
			printResponse('Goodbye my friend!')
		},
		'exit': function() {
			printResponse('You sucessfully left.')
		},
		'move :direction': function(direction) {
			if (direction === 'up' || direction === 'down' || direction === 'left' || direction === 'right') {
				printResponse(`Okay, I will move ${direction} direction`);
			} else {
				printResponse('I don\'t know this direction.');
			}
		},
		'save *face': function(face) {
			if (face === 'boot' || face === 'door' || face === 'hand' || face === 'courage') {
				printResponse(`Saving 1 die: ${face}`);
			} else {
				printResponse('There\'s no such die face in this game');
			}
		}
	}

	annyang.addCommands(commands);

	annyang.start();
}

var printResponse = function(answer) {
	console.log(answer);
	var node = `<li>${answer}</li>`
}