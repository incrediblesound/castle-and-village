var MapController = function(){
  System.call(this);
  this.map = document.getElementById('map');
  this.context = this.map.getContext('2d');
  this.state = "exploring"
  this.priorState;
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
}

MapController.prototype = Object.create(System.prototype);


MapController.prototype.drawUnits = function(){
  $('.units').empty();
  $('.units').append(window.gameState.gameController.views['explore'].render());
  var self = this;
  this.drawGrid();
  this.context.font = "bold 12px sans-serif";

  var x = this.context.fillText("X", this.playerLocation.x, this.playerLocation.y);

  window.gameState.gameController.views.map.render();

  for(var obj in window.gameState.gameController.views.map.objects){
    var self = this;
    if(obj === 'tree'){
      var tree = new Image();
      tree.src = "img/tree.png";
      tree.onload = function(){
        for(var i = 0; i < window.gameState.gameController.views.map.objects[obj].length; i++){
          var co = window.gameState.gameController.views.map.objects[obj][i];
          self.context.drawImage(tree, co[0], co[1], 17, 19);
          console.log('tree');
        }
      }
    }
    else if(obj === 'mount'){
      for(var i = 0; i < window.gameState.gameController.views.map.objects[obj].length; i++){
        var co = window.gameState.gameController.views.map.objects[obj][i];
        this.context.fillText("M", co[0], co[1]);
      }  
    }
    else if(obj === 'fill'){
      for(var i = 0; i < window.gameState.gameController.views.map.objects[obj].length; i++){
        var co = window.gameState.gameController.views.map.objects[obj][i];
        this.context.fillRect(co[0], co[1], 20, 20);
      }  
    }
  }
}

MapController.prototype.checkCollision = function(unit){
  if(this.state === 'fighting'){
    return 'battle';
  }
  var result = false, obstruct, thing, distance;
  for(obj in window.gameState.gameController.views.map.objects){
    var obstruct = window.gameState.gameController.views.map.objects[obj];
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
    if(this.priorState === 'fighting'){
      this.changeState('exploring');
      return;
    } else {
      this.changeState("fighting")
      window.gameState.gameController.trigger('combat');
      return 'battle';
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
  var collision = this.checkCollision();
  if(collision === 'battle'){
    return;
  }
  else if(!collision || collision.onSide !== 'below'){
    this.playerLocation.y -= 20;
    if(this.playerLocation === this.homeLocation){
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

MapController.prototype.init = function(map){
  var self = this;
  window.gameState.gameController.state = 'outside';
  window.gameState.gameController.views['map'].init(map);
  this.playerLocation = window.gameState.gameController.views['map'].playerLocation;

  $('.actions button').prop('disabled', true);
  $('.purchase button').prop('disabled', true);
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
  return this.drawUnits();
}

MapController.prototype.goHome = function(){
  var bounty = window.gameState.gameController.controllers.combat.bounty;
  for(prize in bounty){
    if(bounty.hasOwnProperty(prize)){
      if(prize === 'wolves'){
        window.gameState.gameController.stats.wolves += bounty['wolves'];
      }
      //if prize === gold add gold to castle
    }
  }
  var army = window.gameState.gameController.controllers['combat'].playerArray;
  if(army){
    for(var i = 0; i < army.length; i++){
      if(army[i].name === 'peasant'){
        window.gameState.gameController.peasants(1);
      }
      if(army[i].name === 'knight'){
        window.gameState.gameController.units['barracks'].knights += 1;
      }
      if(army[i].name === 'cavalry'){
        window.gameState.gameController.units['barracks'].horses += 1;
      }
      if(army[i].name === 'wizard'){
        window.gameState.gameController.units['castle'].wizards += 1;
      }
    }
  }
  this.map.width = this.map.width;
  $('.middle').find(':first-child').remove();
  window.gameState.gameController.state = 'inside';
  window.gameState.gameController.trigger('step');
}

MapController.prototype.changeState = function(state){
  this.priorState = this.state;
  this.state = state;
}