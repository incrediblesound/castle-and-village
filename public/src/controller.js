var Controller = function(){
  System.call(this);
  this.state = 'inside';
  this.level = 0;
  this.units = {};
  this.controllers = {};
  this.views = {};
}

Controller.prototype = Object.create(System.prototype);
Controller.prototype.constructor = Controller;

Controller.prototype.init = function(){
  var self = this;
  this.units['domain'] = new Domain();

  this.on('step', function(){
    if(self.state === 'inside'){
      $('.step').prop('disabled', false);
      $('.actions button').prop('disabled', false);
      $('.purchase button').prop('disabled', false);
      window.gameState.gameController.controllers['milestones'].step();
      window.gameState.gameController.controllers['disasters'].step();
      // every game unit must step
      for(var unit in self.units){
        if(self.units.hasOwnProperty(unit)){
          self.units[unit].step();
        }
      }

      self.entropy();
      //this is last in case any of the above methods change available actions
      window.gameState.gameController.controllers['actions'].step();

      // if you lose...
      if(self.checkLoseConditions()){
        $('.game').empty();
        $('.game').append('<h1 class="text-center">Your Kingdom Has Crumbled</h1><p class="text-center">Refresh to Play Again</p>');
        return;
      }

      if(self.state !== 'outside'){
        $('.units').empty();
        // append each unit to the html
        for(var unit in self.units){
          if(self.units.hasOwnProperty(unit)){
            $('.units').append(self.units[unit].render());
          }
        }
        //check and advance game stage
        if(window.gameState.stage < 24){
          window.gameState.stage += 1;
        } else {
          window.gameState.stage = 0;
        }
        window.gameState.actions = [];
        // $('.todo').empty();
        //end step function
        listeners();
        $('.kingdom-heading').text('Level ' + window.gameState.gameController.level + ' Kingdom');
      }
    }
    if(self.state === 'outside'){
      window.gameState.gameController.views['explore'].render();
    }
  })

  this.on('render', function(){
    // append each unit to the html
    for(var unit in self.units){
      if(self.units.hasOwnProperty(unit)){
        $('.units').append(self.units[unit].render());
      }
    }
  })

  this.on('combat', function(){
    window.gameState.gameController.controllers['combat'].init();
    window.gameState.gameController.controllers['combat'].fight();
    $('.attack-select').on('click', function(){
      console.log(this);
    })
  })

}

Controller.prototype.entropy = function(){
  //feed the knights
  if(window.gameState.gameController.units['castle'] !== undefined){
    if(window.gameState.gameController.units['castle'].food < window.gameState.gameController.units['castle'].knights){
      window.gameState.gameController.units['castle'].food = 0;
      window.gameState.gameController.units['castle'].knights -= 1;
    } else {
      window.gameState.gameController.units['castle'].food -= window.gameState.gameController.units['barracks'].knights;
    }
  }
  //if village food is below a threshold relative to village population bad things happen
  if(window.gameState.gameController.units['village'] !== undefined){
    if(window.gameState.gameController.units['village'].food < (Math.round(window.gameState.gameController.units['village'].population/5))){
      window.gameState.gameController.units['village'].population -= 10;
      window.gameState.gameController.units['village'].happiness -= 1;
    }
    if(window.gameState.gameController.units['village'].population < (window.gameState.gameController.units['domain'].fields * 3)){
      window.gameState.gameController.controllers['disaster'].doDisaster('wilderness');
    }
  }
}

Controller.prototype.checkLoseConditions = function(){
  if(window.gameState.level > 0){
    if(window.gameState.gameController.units['village'].happiness <= 0){
      return true;
    }
    if(window.gameState.gameController.units['village'].population < 10){
      return true;
    }
  } else {
    return false;
  }
}