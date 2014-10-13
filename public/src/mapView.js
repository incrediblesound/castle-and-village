var MapView = function(){
  System.call(this);
  this.maps = {
    'domain': DomainMap,
    'catacombs': CatacombsMap,
    'forest': ForestMap
  }
}

MapView.prototype = Object.create(System.prototype);

MapView.prototype.init = function(map){
  this.Map = this.maps[map];
  this.Map.call(this);
  window.gameState.gameController.views['explore'].state = this.state;
  $('.middle').prepend('<h3 class="text-center">'+this.name+'</h3>');
  this.render = this.Map.prototype.render;
}

MapView.prototype.getEnemies = function(){
  return this.enemies;
  // var l = this.enemies.length;
  // var index = function(){
  //   return Math.round(Math.random() * l);
  // }
  // return this.enemies[index()];
}