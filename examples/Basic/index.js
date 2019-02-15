const express = require('express');

const app = express();

const staticDirectory = express.static(__dirname + '/app/');

app.use(staticDirectory);

app.get('/:person', function (req, res) {
	const name = req.params.person;

	res.send('hello ' +
		name.charAt(0).toUpperCase() +
		name.substring(1, name.length).toLowerCase()
	);
});

app.get('*', function (req, res) {
	res.send(404);
});

app.listen(8080);
