// Import Socket.io
const socket = io();

// Store device type
let deviceType = 'Other';

if (navigator.userAgent.match('iPhone')) {
	deviceType = 'iPhone';
} else if (navigator.userAgent.match('Android')) {
	deviceType = 'Android';
} else {
	deviceType = 'Other';
}

// Send device type
socket.emit('deviceType', deviceType);

// Initialize events

// When we start touching
document.addEventListener('touchstart', function (e) {
	// Send the position to the server
	socket.emit('touchStart', {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY
	});
});

// When we stop touching
document.addEventListener('touchend', function (e) {
	// Let the server know
	socket.emit('touchEnd', {});
});

// When we move our touch
document.addEventListener('touchmove', function (e) {
	// Send the position to the server
	socket.emit('touchMove', {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY
	});

	// And prevent the default behaviour (i.e. scrolling etc.)
	e.preventDefault();
}, {
	// We need this to prevent default behaviour
	passive: false
});

// When we receive updated users from the server
socket.on('users', function(users) {
	// We need to update our DOM
	// Create an array of IDs from the users object's keys (if you don't know what any particular variable is, just console.log it!)
	const ids = Object.keys(users);

	// Loop over all IDs
	for (let i = 0; i < ids.length; i++) {
		// Get each ID
		const id = ids[i];

		// Get the corresponding user
		const user = users[id];
		
		// Try to find the user's div on the page
		let target = document.querySelector('.circle[data-user="' + id + '"]');

		// If it is not found, we haven't seen this user before, so create a new div for it
		if (!target) {
			// Create the circle
			target = document.createElement('div');
			target.classList.add('circle');
			
			// Attach the user id to the div's dataset (use inspect element in your browser to see how they are stored in the div's dataset)
			target.dataset.user = id;
			document.body.appendChild(target);

			// Attach a label
			const label = document.createElement('div');
			label.classList.add('label');

			// Set the label to the device type of the user
			label.innerHTML = user.type;
			target.appendChild(label);
		}

		// Now we know that we have a target div
		if (user.active) {
			// If the user is touching, add the 'active' class
			target.classList.add('active');
		} else {
			// If not, remove the 'active' class
			target.classList.remove('active');
		}

		// Finally, set the div location on the page
		target.style.left = user.x + 'px';
		target.style.top = user.y + 'px';
	}
});
