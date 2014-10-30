var MountainMap = function(){
  this.name = 'The Mountainside'
  this.objects = {
    stone1: [[0,0],[11,0],[1,14],[2,4],[6,7],[4,16],[0,16],[7,5],[7,1]],
    stone2: [[10,6],[3,0],[2,0],[8,10]],
    tree: [[0,2],[0,6],[0,8],[10,7],[0,12],[16,0],[10,6],[1,5],[3,9],[5,8],[8,11],[1,16]],
    deadTree: [[5,13],[3,15],[6,4],[8,0],[2,7]],
    vineyard1: [[1,9],[1,10],[1,11],[0,9],[0,10],[0,11]],
    vineyard2: [[3,6],[4,6],[5,6],[3,5],[4,5],[5,5]]
    ravens1: [[4,8]],
    ravens2: [[2,11]],
    ravens3: [[7,6]]
  }

  this.enemies = [['ravens', 3]]
  this.found = [];
  this.passable = ['ravens1','ravens2','ravens3']

  this.checkEncounter = function(collision){
    if(this.passable.indexOf(collision.object) !== -1 && this.found.indexOf(collision.object) === -1){
      this.found.push(collision.object);
      return true;
    }
    else if(collision.object === 'vineyard1' && this.found.indexOf('vineyard1') === -1){
      this.found.push('vineyard1');
      window.gameState.gameController.message('The people think this spot would be good for a vineyard.')
      window.gameState.gameController.changeBounty('vineyards', 1);
      return false
    }
    else if(collision.object === 'vineyard2' && this.found.indexOf('vineyard2') === -1){
      this.found.push('vineyard2');
      window.gameState.gameController.message('The people think this spot would be good for a vineyard.')
      window.gameState.gameController.changeBounty('vineyards', 1);
      return false
    }
    else {
      var rnd = Math.round(Math.random() * 6);
      return rnd > 4;
      // return false;
    }
  }

  this.getPlayerArmy = function(){
    var peasants = window.gameState.gameController.getStat('domain', 'Peasants') - 3;
    window.gameState.gameController.changeStat('domain', 'Peasants', -peasants);
    var villagers = window.gameState.gameController.getStat('village', 'Villagers') - 2;
    window.gameState.gameController.changeStat('village', 'Villagers', -villagers);
    return { peasants: peasants, villagers: villagers };
  }

  this.getBounty = function(){
    return { vineyards: 0 };
  }

  this.playerLocation = new Location(305, 175)
  this.homeLocation = new Location(325, 175)

  this.state = 'The great blackstone mountain...'
  this.winMessage = "The terrible birds are vanquished!"
}

MountainMap.prototype.render = function(){
  var hut = new Image();
  hut.src = 'img/hut.png';
  hut.onload = function() {
    window.gameState.gameController.controllers.map.context.drawImage(hut, 320, 160);
  }
};