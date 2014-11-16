var express = require('express');
var r = require('rethinkdb');
var path = require('path')
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/lose', function(req, res){
  res.render('index.html');
})

app.post('/save', function(req, res){
  console.log(req.body);
  var game = req.body.game;
  connect().then(function(conn){
    return r.table('games').insert(game, {conflict: 'replace'}).run(conn);
  }).then(function(){
    res.end();
  })
});

app.get('/load/:email', function(req, res, next){
  var email = req.params.email;
  connect()
  .then(function(conn){
    return r.table('games').get(email).run(conn);
  })
  .then(function(response){
    res.json(response);
  })
  .catch(next);
})

function connect(){
  return r.connect({ 
    host: 'localhost',
    port: 28015,
    db: 'castle'
  })
};

module.exports = app;