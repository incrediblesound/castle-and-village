var express = require('express');
var r = require('rethinkdb');
var path = require('path')
var app = express();
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/lose', function(req, res){
  res.render('index.html');
})

app.post('/save', function(req, res){
  var game = req.body.game;
  connect().then(function(conn){
    r.table('games').insert(game).run(conn);
  });
});

app.get('/load/:email', function(req, res){
  var email = req.params.email;
  Game.findOne({email: email}).exec(function(err, game){
    res.end();
  })
})

function connect(){
  return r.connect({ host: 'localhost',
    port: 28015,
    db: 'castle'
  })
};

module.exports = app;