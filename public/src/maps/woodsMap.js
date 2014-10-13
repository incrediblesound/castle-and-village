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
  this.homeLocation = {
    x: 325,
    y: 175
  }
  this.state = 'The woods are dark and deep...'
  this.winMessage = "The wolves scatter, awed by your might!"
}

ForestMap.prototype.render = function(){
  var hut = new Image();
  hut.src = 'img/hut.png';
  hut.onload = function() {
    window.gameState.gameController.controllers.map.context.drawImage(hut, 320, 160);
  };
}