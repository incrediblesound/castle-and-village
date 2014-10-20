var LakeMap = function(){
  this.name = 'The Lake'
  this.objects = {
    water: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[0,1],[1,1],[2,1],[3,1],
    [4,1],[5,1],[6,1],[7,1],[8,1],[0,2],[1,2],[2,2],[3,2],
    [4,2],[5,2],[6,2],[7,2],[8,2],[0,3],[1,3],[2,3],[3,3],
    [4,3],[5,3],[6,3],[7,3],[8,3],[1,4],[2,4],[3,4],
    [4,4],[5,4],[6,4],[7,4],[2,5],[3,5],[4,5],[5,5],[6,5]],
    bear: [[2,5],[3,5],[4,5],[5,5],[6,5],[2,6],[3,6],[4,6],[5,6],[6,6],[2,7],[3,7],[4,7],[5,7],[6,7]],
    tree: [[0,4],[0,5],[0,6],[0,7],[0,8],[0,10],[0,11],[0,12],
    [1,5],[1,6],[1,8],[1,9],[1,12],[1,13],[1,14],
    [2,7],[3,10],[3,14],[3,15],[3,8],[4,11],
    [8,4],[8,5],[8,6],[8,13],[8,9],
    [7,5],[7,6],[7,7],[7,8],[7,14],[7,11],[7,15],
    [6,6],[6,10]]
  }

  this.enemies = [['bear', 1]];

  this.checkEncounter = function(collision){
    // if(window.gameState.gameController.combatBounty('bear') === 1){
    //   return 'complete';
    // } else {
      return (collision && collision.object === 'bear' 
        && window.gameState.gameController.combatBounty('bear') === 0)
    // }
  }

  this.getPlayerArmy = function(){
    var num = window.gameState.gameController.getStat('village', 'Villagers') - 2;
    window.gameState.gameController.changeStat('village', 'Villagers', -num);
    return { villagers: num };
  }

  this.getBounty = function(){
    return { bear: 0 };
  }

  this.playerLocation = new Location(325, 95)
  this.homeLocation = new Location(325,175)
    
  this.state = 'You come to the edge of a vast lake...'
  this.winMessage = "The terrible grizzly is vanquished!"
}

LakeMap.prototype.render = function(){
}