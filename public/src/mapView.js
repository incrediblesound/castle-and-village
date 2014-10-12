var MapView = function(){
  System.call(this);
  this.maps = {
    'domain': DomainMap,
    'catacombs': CatacombsMap
  }
}

MapView.prototype = Object.create(System.prototype);

MapView.prototype.init = function(map){
  this.Map = this.maps[map];
  this.Map.call(this);
  window.gameState.gameController.views['explore'].state = this.state;
  this.render = this.Map.prototype.render;
}

MapView.prototype.getEnemies = function(){
  var index = function(){
    return Math.round(Math.random() * this.enemies.length);
  }
  return this.enemies[index()];
}