var ForestMap = function(){
  this.name = 'The Forest'
  this.objects = {
    tree: [[0,0],[3,0],[4,0],[7,0],[8,0],[7,1],[8,1],[0,2],[1,2],[4,2],[6,2],[8,2],
    [0,3],[1,3],[3,3],[6,3],[0,4],[3,4],[4,4],[8,4],[0,5],[2,5],[3,5],[4,5],[5,5],[7,5],[8,5],
    [0,6],[2,6],[3,6],[4,6],[7,6],[3,7],[5,7],[0,8],[4,8],[5,8],[6,8],[0,9],[1,9],[2,9],[5,9],
    [8,10],[0,11],[2,11],[4,11],[5,11],[7,11],[8,11],[0,12],[1,12],[4,12],[8,12],
    [0,13],[1,13],[4,13],[6,13],[7,13],[8,13],[0,14],[3,14],[7,14],[8,14],[0,15],[3,15],[4,15],
    [0,16],[2,16],[3,16],[4,16],[5,16],[6,16]]
  }

  this.enemies = [['wolves', 3]]

  this.checkEncounter = function(collision){
    var rnd = Math.round(Math.random() * 6);
    return rnd > 3;
  }

  this.playerLocation = new Location(305, 175)
  this.homeLocation = new Location(325, 175)
  
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