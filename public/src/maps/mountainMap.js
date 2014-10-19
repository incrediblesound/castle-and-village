var MountainMap = function(){
  this.name = 'The Mountainside'
  this.objects = {
    stone1: [[0,0],[0,11],[14,1],[4,2],[7,6]],
    stone2: [[4,5],[6,10],[0,3],[13,8]],
    tree: [[0,2],[0,6],[0,8],[10,7],[0,12],[16,0],[1,0],[1,5],[1,8],[1,10],[2,3],[16,2]],
  }

  this.enemies = [['wolves', 4]]

  this.checkEncounter = function(collision){
    var rnd = Math.round(Math.random() * 6);
    return rnd > 3;
  }

  this.playerLocation = new Location(305, 175)
  this.homeLocation = new Location(325, 175)

  this.state = 'The great blackstone mountain...'
  this.winMessage = "The wolves scatter, awed by your might!"
}

MountainMap.prototype.render = function(){
  var hut = new Image();
  hut.src = 'img/hut.png';
  hut.onload = function() {
    window.gameState.gameController.controllers.map.context.drawImage(hut, 320, 160);
  }
};