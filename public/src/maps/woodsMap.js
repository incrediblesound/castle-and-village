var ForestMap = function(){
  this.name = 'The Forest'
  this.objects = {
    tree: [[143, 81],[123,81],[123,101],[263,161],[243,161],[223,161],
    [243,141],[83,41],[83,21],[43,21],[43,41],[283,1],[263,21],[263,1],[143,41]]
    // mount: [[165, 75],[145,55],[125,55]]
  }

  this.enemies = [['wolves', 3]]

  this.playerLocation = {
    x: 305,
    y: 175
  }
  this.state = 'Exploring your domain...'
}

ForestMap.prototype.render = function(){
  // var castle = new Image();
  // castle.src = 'img/castle.jpeg';
  // castle.onload = function() {
  //   window.gameState.controllers.mapController.context.drawImage(castle, 320, 160);
  // };
}