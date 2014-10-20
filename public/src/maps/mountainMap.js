var MountainMap = function(){
  this.name = 'The Mountainside'
  this.objects = {
    stone1: [[0,0],[11,0],[1,14],[2,4],[6,7],[4,3]],
    stone2: [[10,6],[3,0],[8,13]],
    tree: [[0,2],[0,6],[0,8],[10,7],[0,12],[16,0],[10,6],[1,5],[3,9],[4,7],[8,11],[16,2]],
    deadTree: [[5,13],[3,15],[6,4],[7,1],[2,7]],
    vineyard1: [[1,9],[1,10],[1,11],[0,9],[0,10],[0,11]]
  }

  this.enemies = [['ravens', 3]]
  this.found = [];

  this.checkEncounter = function(collision){
    if(collision.object === 'vineyard1' && this.found.indexOf('vineyard1') === -1){
      this.found.push('vineyard1');
      window.gameState.gameController.message('The people think this spot would be good for a vineyard.')
      window.gameState.gameController.changeBounty('vineyards', 1);
      return false
    } else {
      var rnd = Math.round(Math.random() * 6);
      return rnd > 4;
    }
  }

  this.getPlayerArmy = function(){
    var peasants = window.gameState.gameController.getStat('domain', 'Peasants') - 4;
    window.gameState.gameController.changeStat('domain', 'Peasants', -peasants);
    var villagers = window.gameState.gameController.getStat('village', 'Villagers') - 3;
    window.gameState.gameController.changeStat('village', 'Villagers', -villagers);
    return { peasants: peasants, villagers: villagers };
  }

  this.getBounty = function(){
    return { vineyards: 0 };
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