var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('engine'));

app.listen(8080);