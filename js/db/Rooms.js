'use strict';

const ROOMS = [
	{
		name: 'start',
		doors: [0,1,0,1],
		special: 'start'
	},
	{
		name: 'exit-t',
		doors: [1,0,0,0],
		special: 'exit'
	},
	{
		name: 'exit-r',
		doors: [0,1,0,0],
		special: 'exit'
	},
	{
		name: 'exit-b',
		doors: [0,0,1,0],
		special: 'exit'
	},
	{
		name: 'exit-l',
		doors: [0,0,0,1],
		special: 'exit'
	},
	{
		name: '1door-t',
		doors: [1,0,0,0],
	},
	{
		name: '1door-r',
		doors: [0,1,0,0],
	},
	{
		name: '1door-b',
		doors: [0,0,1,0],
	},
	{
		name: '1door-l',
		doors: [0,0,0,1],
	},
	{
		name: '2door-lr',
		doors: [0,1,0,1],
	},
	{
		name: '2door-tb',
		doors: [1,0,1,0],
	},
	{
		name: '2door-tr',
		doors: [1,1,0,0],
	},
	{
		name: '2door-br',
		doors: [0,1,1,0],
	},
	{
		name: '2door-bl',
		doors: [0,0,1,1],
	},
	{
		name: '2door-tl',
		doors: [1,0,0,1],
	},
	{
		name: '3door-t',
		doors: [1,1,0,1],
	},
	{
		name: '3door-r',
		doors: [1,1,1,0],
	},
	{
		name: '3door-b',
		doors: [0,1,1,1],
	},
	{
		name: '3door-l',
		doors: [1,0,1,1],
	},
	{
		name: '4door',
		doors: [1,1,1,1],
	}
];

// Add connections
ROOMS.forEach(room => {
	room.connections = [null, null, null, null];
	room.numDoors = room.doors.reduce((a,b) => a + b, 0);
});


