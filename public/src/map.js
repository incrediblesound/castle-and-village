var MapController = function(){
  System.call(this);
  this.map = document.getElementById('map');
  this.context = this.map.getContext('2d');

  this.playerLocation = {
    x: 285,
    y: 175
  }

  this.opponentLocation = {
    x: 165,
    y: 75
  }

  this.collisions = {
    '0': {
      '20': 'below',
      '-20': 'above'
    },
    '-20': {
      '0': 'left',
      '20': 'bottom-left',
      '-20': 'top-left'
    },
    '20': {
      '0': 'right',
      '20': 'bottom-right',
      '-20': 'top-right'
    }
  }

}

MapController.prototype = Object.create(System.prototype);


MapController.prototype.drawUnits = function(){
  this.drawGrid();
  this.context.font = "bold 12px sans-serif";
  var x = this.context.fillText("X", this.playerLocation.x, this.playerLocation.y);
  var o = this.context.fillText("O", this.opponentLocation.x, this.opponentLocation.y);
  var collision = this.checkCollision();
  console.log(collision);
}

MapController.prototype.checkCollision = function(unit){
  var result = false;
  var units = {
    'opponent': [(this.playerLocation.x - this.opponentLocation.x), (this.playerLocation.y - this.opponentLocation.y)]
  }
  for(unit in units){
    var distance = units[unit];
    if(this.withinTwenty(distance)){
      result = {collide: unit, onSide: this.collisions[distance[0]][distance[1]]};
    }
  }
  return result;
}

MapController.prototype.withinTwenty = function(xy){
  if((xy[0] === 20 || xy[0] === -20 || xy[0] === 0) && (xy[1] === -20 || xy[1] === 20 || xy[1] === 0)){
    return true;
  }
  else { return false; }
}

MapController.prototype.playerMoveUp = function(){
  this.playerLocation.y -= 20;
  this.drawUnits();
}
MapController.prototype.playerMoveDown = function(){
  this.playerLocation.y += 20;
  this.drawUnits();
}
MapController.prototype.playerMoveLeft = function(){

  this.playerLocation.x -= 20;
  this.drawUnits();
}
MapController.prototype.playerMoveRight = function(){
  this.playerLocation.x += 20;
  this.drawUnits();
}

MapController.prototype.drawGrid = function(){
  this.map.width = this.map.width;
  for(x = 0.5; x < 300; x += 20){
    this.context.moveTo(x, 0);
    this.context.lineTo(x, 180);
  }
  for(y = 0.5; y < 180; y += 20){
    this.context.moveTo(0, y);
    this.context.lineTo(300, y); 
  }
  this.context.moveTo(300, 0);
  this.context.lineTo(300, 180);
  this.context.moveTo(0, 180);
  this.context.lineTo(300, 180);

  this.context.strokeStyle = "#8f8f8f";
  this.context.stroke();
}