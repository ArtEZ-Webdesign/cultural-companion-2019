const express = require('express');
const app = express();
const static = express.static(__dirname + '/app');

app.use(static);

app.listen(8080);
