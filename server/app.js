var express = require('express');
var path = require('path')
var app = express();
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/lose', function(req, res){
  res.render('index.html');
})

app.post('/save', function(req, res){
  var email = req.body.email;
  var game = req.body.game;
  new Game({
    stage: data.stage,
    user: data.user,
    milestones: data.milestones,
    village: new Village({
      // TODO
    }),
    domain: new Domain({
      // TODO
    })
  })
})

app.get('/load/:email', function(req, res){
  var email = req.params.email;
  Game.findOne({email: email}).exec(function(err, game){
    res.end();
  })
})

module.exports = app;