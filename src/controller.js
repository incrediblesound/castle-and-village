var Controller = function(){
  System.call(this);
}

Controller.prototype = Object.create(System.prototype);
Controller.prototype.constructor = Controller;

Controller.prototype.init = function(){
  this.on('step', function(){
    window.gameState.units.castle.step();
    window.gameState.units.domain.step();
    window.gameState.units.barracks.step();
    window.gameState.units.village.step();
    window.gameState.controllers.milestones.step();
    window.gameState.controllers.actionController.step();
    window.gameState.controllers.disasterController.step();
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