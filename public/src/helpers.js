var forEach = function(array, fn){
  for(var i = 0, l = array.length; i < l; i++){
    fn(array[i]);
  }
}

var Cell = function(x, y){
  var height = 20;
  var width = 20;
  this.row = Math.floor(y/height);
  this.col = Math.floor(x/width);
}

var Location = function(x, y){
  this.x = x || null;
  this.y = y || null;
}

Location.prototype.isEqual = function(location){
  return (this.x === location.x && this.y === location.y);
}

Location.prototype.merge = function(location){
  this.x = location.x;
  this.y = location.y;
}

Location.prototype.toCell = function(){
  var cell = new Cell(this.x, this.y);
  return cell;
}

var getCursorPosition = function(e) {
  var canvas = $('#map')[0];
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  var cell = new Cell(x, y);
  return cell;
}