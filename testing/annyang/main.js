'use strict';

var appHTML = document.getElementById('app');

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
		'move *direction': function(direction) {
			printResponse('Moving ' + direction);
		}
	}

	annyang.addCommands(commands);

	annyang.start();
}

var printResponse = function(answer) {
	var node = document.createElement('li');
	var textNode = document.createTextNode(answer);
	appHTML.appendChild(node);
}