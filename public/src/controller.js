var Controller = function(){
  System.call(this);
  this.state = 'inside';
}

Controller.prototype = Object.create(System.prototype);
Controller.prototype.constructor = Controller;

Controller.prototype.init = function(){
  var self = this;
  this.on('step', function(){
    if(self.state === 'inside'){
      $('.step').prop('disabled', false);
      $('.actions button').prop('disabled', false);
      $('.purchase button').prop('disabled', false);
      window.gameState.controllers.milestones.step();
      window.gameState.controllers.disasterController.step();
      window.gameState.units.castle.step();
      window.gameState.units.domain.step();
      window.gameState.units.barracks.step();
      window.gameState.units.village.step();

      self.entropy();
      //this is last in case any of the above methods change available actions
      window.gameState.controllers.actionController.step();
      if(self.checkLoseConditions()){
        $('.game').empty();
        $('.game').append('<h1 class="text-center">Your Kingdom Has Crumbled</h1><p class="text-center">Refresh to Play Again</p>');
        return;
      }
      if(self.state !== 'outside'){
        $('.units').empty();
        $('.units').append(window.gameState.units.castle.render());
        $('.units').append(window.gameState.units.village.render());
        $('.units').append(window.gameState.units.barracks.render());
        $('.units').append(window.gameState.units.domain.render());
        //check and advance game stage
        if(window.gameState.stage < 24){
          window.gameState.stage += 1;
        } else {
          window.gameState.stage = 0;
        }
        window.gameState.actions = [];
        $('.todo').empty();
        //end step function
        $('.action').on('click', function(){
        var text = $(this).text();
        if(window.gameState.actions.length < 2){
          window.gameState.actions.push(text);
          $('.todo').append('<li>'+text+'</li>');
        }
        $('.kingdom-heading').text('Level ' + window.gameState.units.castle.level + ' Kingdom');
        })
      }
    }
    if(self.state === 'outside'){
      window.gameState.units.exploreView.render();
    }
  })
  this.on('render', function(){
    $('.units').append(window.gameState.units.castle.render());
    $('.units').append(window.gameState.units.domain.render());
    $('.units').append(window.gameState.units.barracks.render());
    $('.units').append(window.gameState.units.village.render());
  })

  this.on('combat', function(){
    window.gameState.controllers.combatController.init();
    window.gameState.controllers.combatController.fight();
    $('.attack-select').on('click', function(){
      console.log(this);
    })
  })

}

Controller.prototype.entropy = function(){
  //feed the knights
  if(window.gameState.units.castle.food < window.gameState.units.castle.knights){
    window.gameState.units.castle.food = 0;
    window.gameState.units.castle.knights -= 1;
  } else {
    window.gameState.units.castle.food -= window.gameState.units.barracks.knights;
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

Controller.prototype.checkLoseConditions = function(){
  if(window.gameState.units.village.happiness <= 0){
    return true;
  }
  if(window.gameState.units.village.population < 10){
    return true;
  }
}