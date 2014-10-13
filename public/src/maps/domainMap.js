var DomainMap = function(){
  this.objects = {
    tree: [[145, 75],[125,75],[125,95],[265,175],[245,175],[225,175],[245,155]],
    mount: [[165, 75],[145,55],[125,55]]
  }
  this.name = 'Domain';
  this.enemies = [[['bandits', 3]],[['bandits', 2],['knights',1]]]

  this.playerLocation = {
    x: 305,
    y: 175
  }
  this.state = 'Exploring your domain...'
}

DomainMap.prototype.render = function(){
  var castle = new Image();
  castle.src = 'img/castle.jpeg';
  castle.onload = function() {
    window.gameState.controllers.mapController.context.drawImage(castle, 320, 160);
  };
}