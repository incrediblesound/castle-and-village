var MapView = function(){
  System.call(this);
  this.maps = {
    'domain': DomainMap
  }
}

MapView.prototype = Object.create(System.prototype);

MapView.prototype.init = function(map){
  this.Map = this.maps[map];
  this.Map.call(this);
  this.render = this.Map.prototype.render;
}
