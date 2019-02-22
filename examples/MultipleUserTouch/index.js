// Import Express and Socket.io
const express = require('express');
const socketio = require('socket.io');

// Set up our app and its server
const app = express();
const server = require('http').Server(app);

// Set up our static directory
const static = express.static(__dirname + '/app');
app.use(static);

// Set up Socket.io
const io = socketio(server);

// This is the interesting part
// Create an object that will contain our users, where each user's id is the key
const users = {};

// When a new user connects...
io.on('connection', function(socket) {
	// Store the user's id
	const id = socket.id;

	// If the user has not been seen before
	if (!users.hasOwnProperty(id)) {
		// Create a new user in our users object
		// It stores the user's device type, whether they are touching, and the x and y position of the last touch
		users[id] = {
			type: '',
			active: false,
			x: 0,
			y: 0
		};
	}

	// When we receive a deviceType, store it in our users object
	socket.on('deviceType', function(deviceType) {
		users[id].type = deviceType;
	});
	
	// When we start touching, update our users object
	socket.on('touchStart', function (touchStart) {
		users[id].active = true;
		users[id].x = touchStart.x;
		users[id].y = touchStart.y;

		// And emit our updated users object to the clients
		io.emit('users', users);
	});
	
	// When we stop touching, update our users object
	socket.on('touchEnd', function (touchEnd) {
		users[id].active = false;

		// And emit our updated users object to the clients
		io.emit('users', users);
	});

	// When we move our touch, update our users object
	socket.on('touchMove', function (touchMove) {
		users[id].x = touchMove.x;
		users[id].y = touchMove.y;

		// And emit our updated users object to the clients
		io.emit('users', users);
	});

	// When a user disconnects, delete it from our users object
	socket.on('disconnect', function () {
		delete users[id];
	});
});

// Start the server
server.listen(8080);
