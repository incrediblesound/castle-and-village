var MapController = function(){
  System.call(this);
  this.map = document.getElementById('map');
  this.context = this.map.getContext('2d');
  this.state="exploring"
  this.size = {
    x: 340,
    y: 180
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
  this.objects = {
    tree: [[145, 75],[125,75],[125,95],[265,175],[245,175],[225,175],[245,155]],
    mount: [[165, 75],[145,55],[125,55]]
  }
}

MapController.prototype = Object.create(System.prototype);


MapController.prototype.drawUnits = function(){
  $('.units').empty();
  $('.units').append(window.gameState.units.exploreView.render());
  var self = this;
  this.drawGrid();
  this.context.font = "bold 12px sans-serif";

  var x = this.context.fillText("X", this.playerLocation.x, this.playerLocation.y);

  var castle = new Image();
  castle.src = 'img/castle.jpeg';
  castle.onload = function() {
    self.context.drawImage(castle, 320, 160);
  };

  for(var obj in this.objects){
    if(obj === 'tree'){
      for(var i = 0; i < this.objects[obj].length; i++){
        var co = this.objects[obj][i];
        this.context.fillText("*", co[0], co[1]);
      }
    }
    else if(obj === 'mount'){
      for(var i = 0; i < this.objects[obj].length; i++){
        var co = this.objects[obj][i];
        this.context.fillText("M", co[0], co[1]);
      }  
    }
  }
}

MapController.prototype.checkCollision = function(unit){
  var result = false, obstruct, thing, distance;
  for(obj in this.objects){
    var obstruct = this.objects[obj];
    for(var i = 0; i < obstruct.length; i++){
      thing = obstruct[i];
      distance = [this.playerLocation.x - thing[0], this.playerLocation.y - thing[1]];
      if(this.withinTwenty(distance)){
        result = {collide: obj, onSide: this.collisions[distance[0]][distance[1]]};
      }
    }
  }
  var encounter = Math.round(Math.random()*6);
  if(encounter > 3 && this.state !== "fighting"){
    this.state="fighting"
    window.gameState.controllers.gameController.trigger('combat');
    return 'battle';
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
  var collision = this.checkCollision();
  if(collision === 'battle'){
    return;
  }
  else if(!collision || collision.onSide !== 'below'){
    this.playerLocation.y -= 20;
    if(this.playerLocation.x === 325 && this.playerLocation.y === 175){
      this.goHome();
    }
    else {
      this.drawUnits();
    }
  }
}
MapController.prototype.playerMoveDown = function(){
  var collision = this.checkCollision();
  if(collision === 'battle'){
    return;
  }
  else if(collision === 'home'){
    return this.goHome();
  }
  else if(!collision || collision.onSide !== 'above'){
    this.playerLocation.y += 20;
    if(this.playerLocation.x === 325 && this.playerLocation.y === 175){
      this.goHome();
    } 
    else {
      this.drawUnits();
    }
  }
}
MapController.prototype.playerMoveLeft = function(){
  var collision = this.checkCollision();
  if(collision === 'battle'){
    return;
  }
  else if(!collision || collision.onSide !== 'right'){
    this.playerLocation.x -= 20;
    if(this.playerLocation.x === 325 && this.playerLocation.y === 175){
      this.goHome();
    }
    else {
      this.drawUnits();
    }
  }
}
MapController.prototype.playerMoveRight = function(){
  var collision = this.checkCollision();
  if(collision === 'battle'){
    return;
  }
  else if(collision === 'home'){
    return this.goHome();
  }
  if(!collision || collision.onSide !== 'left'){
    this.playerLocation.x += 20;
    if(this.playerLocation.x === 325 && this.playerLocation.y === 175){
      this.goHome();
    }
    else {
      this.drawUnits();
    }
  }
}

MapController.prototype.drawGrid = function(){
  this.map.width = this.map.width;
  for(x = 0.5; x < this.size.x; x += 20){
    this.context.moveTo(x, 0);
    this.context.lineTo(x, this.size.y);
  }
  for(y = 0.5; y < this.size.y; y += 20){
    this.context.moveTo(0, y);
    this.context.lineTo(this.size.x, y); 
  }
  this.context.moveTo(this.size.x, 0);
  this.context.lineTo(this.size.x, this.size.y);
  this.context.moveTo(0, 180);
  this.context.lineTo(this.size.x, this.size.y);

  this.context.strokeStyle = "#8f8f8f";
  this.context.stroke();
}

MapController.prototype.init = function(){
  var self = this;
  this.playerLocation = {
    x: 305,
    y: 175
  }
  $('.step').prop('disabled', true);
  $('.actions button').prop('disabled', true);
  $('.purchase button').prop('disabled', true);
  $('.middle').append('<h3 class="text-center">Domain</h3>');
  $(document).on('keypress', function(event){
    event.stopImmediatePropagation();
    if(event.which === 119){
      self.playerMoveUp();
    }
    if(event.which === 97){
      self.playerMoveLeft();
    }
    if(event.which === 115){
      self.playerMoveDown();
    }
    if(event.which === 100){
      self.playerMoveRight();
    }
  })
  this.drawUnits();
}

MapController.prototype.goHome = function(){
  var gold = window.gameState.controllers.combatController.bounty.gold
  if(gold){
    window.gameState.units.castle.money += gold;
  }
  var army = window.gameState.controllers.combatController.playerArray;
  if(army){
    for(var i = 0; i < army.length; i++){
      if(army[i].name === 'knights'){
        window.gameState.units.barracks.knight += 1;
      }
      if(army[i].name === 'cavalry'){
        window.gameState.units.barracks.horses += 1;
      }
      if(army[i].name === 'wizards'){
        window.gameState.units.castle.wizards += 1;
      }
    }
  }
  this.map.width = this.map.width;
  $('.middle').empty();
  window.gameState.controllers.gameController.state = 'inside';
  window.gameState.controllers.gameController.trigger('step');
}