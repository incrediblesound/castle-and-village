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