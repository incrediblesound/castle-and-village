var express = require('express');
var path = require('path')
var app = express();
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/lose', function(req, res){
	res.render('index.html');
})

module.exports = app;