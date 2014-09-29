var Controller = function(){
  System.call(this);
}

Controller.prototype = Object.create(System.prototype);
Controller.prototype.constructor = Controller;

Controller.prototype.init = function(){
  this.on('step', function(){
    window.gameState.controllers.actionController.step();
    window.gameState.controllers.milestones.step();
    window.gameState.controllers.disasterController.step();
    window.gameState.units.castle.step();
    window.gameState.units.domain.step();
    window.gameState.units.barracks.step();
    window.gameState.units.village.step();
    this.entropy();
    $('.units').append(window.gameState.units.castle.render());
    $('.units').append(window.gameState.units.domain.render());
    $('.units').append(window.gameState.units.barracks.render());
    $('.units').append(window.gameState.units.village.render());
    //check and advance game stage
    if(window.gameState.stage < 24){
      window.gameState.stage += 1;
    } else {
      window.gameState.stage = 0;
    }
  })
  this.on('render', function(){
    $('.units').append(window.gameState.units.castle.render());
    $('.units').append(window.gameState.units.domain.render());
    $('.units').append(window.gameState.units.barracks.render());
    $('.units').append(window.gameState.units.village.render());
  })
}

Controller.prototype.entropy = function(){
  //feed the knights
  if(window.gameState.units.castle.food < window.gameState.units.castle.knights){
    window.gameState.units.castle.food = 0;
    window.gameState.units.castle.knights -= 1;
  } else {
    window.gameState.units.castle.food -= window.gameState.units.castle.knights;
  }
  //if village food is below a threshold relative to village population bad things happen
  if(window.gameState.units.village.food < (Math.round(window.gameState.units.village.population/5))){
    window.gameState.units.village.population -= 10;
    window.gameState.units.village.happiness -= 1;
  }
  if(window.gameState.units.village.population < (window.gameState.units.domain.fields * 3)){
    window.gameState.controllers.disasterController.doDisaster('wilderness');
  }
}