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
      tree.src = "../img/tree.png";
      tree.onload = function(){
        for(var i = 0; i < window.gameState.gameController.views.map.objects['tree'].length; i++){
          var co = window.gameState.gameController.views.map.objects['tree'][i];
          self.context.drawImage(tree, (co[1]*20)+3, (co[0]*20)+1, 17, 19);
        }
      }
    }
    else if(obj === 'stone1'){
      var stone1 = new Image();
      stone1.src = "../img/stone1.png";
      stone1.onload = function(){
        for(var k = 0; k < window.gameState.gameController.views.map.objects['stone1'].length; k++){
          var co = window.gameState.gameController.views.map.objects['stone1'][k];
          self.context.drawImage(stone1, co[1]*20, co[0]*20, 19, 19);
        }  
      }
    }
    else if(obj === 'deadTree'){
      var deadTree = new Image();
      deadTree.src = "img/dead-tree.png";
      deadTree.onload = function(){
        for(var k = 0; k < window.gameState.gameController.views.map.objects['deadTree'].length; k++){
          var co = window.gameState.gameController.views.map.objects['deadTree'][k];
          self.context.drawImage(deadTree, co[1]*20-1, co[0]*20-1, 23, 23);
        }  
      }
    }
    else if(obj === 'stone2'){
      var stone2 = new Image();
      stone2.src = "img/stone2.png";
      stone2.onload = function(){
        for(var i = 0; i < window.gameState.gameController.views.map.objects['stone2'].length; i++){
          var co = window.gameState.gameController.views.map.objects['stone2'][i];
          self.context.drawImage(stone2, co[1]*20, co[0]*20, 23, 23);
        }  
      }
    }
    else if(obj === 'fill'){
      for(var i = 0; i < window.gameState.gameController.views.map.objects[obj].length; i++){
        var co = window.gameState.gameController.views.map.objects[obj][i];
        this.context.fillRect(co[0], co[1], 20, 20);
      }  
    }
    else if(obj === 'water'){
      this.context.fillStyle = 'blue';
      for(var i = 0; i < window.gameState.gameController.views.map.objects[obj].length; i++){
        var co = window.gameState.gameController.views.map.objects[obj][i];
        this.context.fillRect(co[1]*20, co[0]*20, 20, 20);
      }  
    }
  }
}

MapController.prototype.checkCollision = function(direction){
  if(this.state === 'fighting'){
    return 'battle';
  }
  var newPosition = new Location();
  newPosition.merge(this.playerLocation);
  newPosition[direction[0]] += direction[1];
  var playerCell = new Cell(newPosition.x, newPosition.y);
  var collision = false, obstruct, thingCell, distance;
  for(obj in window.gameState.gameController.views.map.objects){
    var obstruct = window.gameState.gameController.views.map.objects[obj];
    for(var i = 0; i < obstruct.length; i++){
      if(obstruct[i][0] === playerCell.row && obstruct[i][1] === playerCell.col){
        collision = {object: obj, position: obstruct[i]};
      }
    }
  }

  var encounter = window.gameState.gameController.views.map.checkEncounter(collision);
  if(encounter){
    // if(encounter === 'complete'){
    //   return this.goHome();
    // }
    if(this.priorState === 'fighting'){
      this.changeState('exploring');
      return collision;
    } else {
      this.changeState("fighting")
      window.gameState.gameController.trigger('combat');
      return 'battle';
    }
  }
  return collision;
}

MapController.prototype.playerMove = function(direction){
  var directionMap = {
    'up': ['y', -20, 'below'],
    'down': ['y', 20, 'above'],
    'left': ['x', -20, 'right'],
    'right': ['x', +20, 'left']
  }
  direction = directionMap[direction];
  var collision = this.checkCollision(direction);
  console.log(collision);
  if(collision === 'battle'){
    return;
  }
  else if(!collision || window.gameState.gameController.objectIsPassable(collision)) {
    this.context.clearRect(this.playerLocation.x-3, this.playerLocation.y-13, 17, 17);
    this.playerLocation[direction[0]] += direction[1];
    if(this.playerLocation.isEqual(this.homeLocation)){
      this.goHome();
    }
    else {
      this.context.fillStyle = 'black';
      this.context.fillText('X', this.playerLocation.x, this.playerLocation.y);
      //this.drawUnits();
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
  this.homeLocation = window.gameState.gameController.views['map'].homeLocation;
  var $mid = $('.middle');
  $mid.append('<button type="button" id="left" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-left"></span></button>');
  $mid.append('<button type="button" id="right" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-right"></span></button>');
  $mid.append('<button type="button" id="up" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-up"></span></button>');
  $mid.append('<button type="button" id="down" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-down"></span></button>');
  $('.actions button').prop('disabled', true);
  $('.purchase button').prop('disabled', true);

  $('#up').on('click', function(e){
    e.stopPropagation();
    self.playerMove('up');
  });
  $('#left').on('click', function(e){
    e.stopPropagation();
    self.playerMove('left');
  });
  $('#down').on('click', function(e){
    e.stopPropagation();
    self.playerMove('down');
  });
  $('#right').on('click', function(e){
    e.stopPropagation();
    self.playerMove('right');
  });

  // $(document).on('click', function(e){
  //   var cell = getCursorPosition(e);
  //   console.log('click', cell);
  //   var playerCell = new Cell(self.playerLocation.x, self.playerLocation.y);
  //   console.log('player', playerCell);
  //   if(cell.row < playerCell.row){
  //     self.playerMove('up'); 
  //   }
  //   else if(cell.row > playerCell.row){
  //     self.playerMove('down');
  //   }
  //   else if(cell.col < playerCell.col){
  //     self.playerMove('left');
  //   } 
  //   else if(cell.col > playerCell.col){
  //     self.playerMove('right');
  //   }
  // });

  return this.drawUnits();
}

MapController.prototype.goHome = function(){
  var bounty = window.gameState.gameController.controllers.combat.bounty;
  for(prize in bounty){
    if(bounty.hasOwnProperty(prize)){
      if(['wolves','bear','vineyards','quarries'].indexOf(prize) !== -1){
        window.gameState.gameController.stats[prize] += bounty[prize];
      }
      //if prize === gold add gold to castle
    }
  }
  var army = window.gameState.gameController.controllers['combat'].playerArray;
  if(army){
    debugger;
    for(var i = 0; i < army.length; i++){
      if(army[i].name === 'peasant'){
        window.gameState.gameController.changeStat('domain','Peasants', 1);
      }
      if(army[i].name === 'villager'){
        window.gameState.gameController.changeStat('village','Villagers', 1);
      }
    }
  }
  this.map.width = this.map.width;
  //removes the four buttons and the map heading
  var $mid = $('.middle')
  $mid.children()[5].remove();
  $mid.children()[4].remove();
  $mid.children()[3].remove();
  $mid.children()[2].remove();
  $mid.children()[0].remove();
  window.gameState.gameController.state = 'inside';
  window.gameState.gameController.trigger('step');
}

MapController.prototype.changeState = function(state){
  this.priorState = this.state;
  this.state = state;
}