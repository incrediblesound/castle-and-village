var Controller = function(){
  System.call(this);
  this.state = 'inside';
  this.season = 'fall';
  this.stats = {
    level: 0,
    wolves: 0,
    bear: 0
  }
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
        (window.gameState.stage < 16) ? window.gameState.stage += 1 : window.gameState.stage = 0;

        self.checkSeasonalChange(window.gameState.stage);

        window.gameState.actions = [];
        // $('.todo').empty();
        //end step function
        listeners();
        $('.kingdom-heading').text('Level ' + self.stats.level + ' Kingdom');
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
    window.gameState.gameController.controllers['combat'].getEnemies();
    window.gameState.gameController.controllers['combat'].render();
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
  return (window.gameState.gameController.stats.level > 0) &&
  ((window.gameState.gameController.getStat('village','Happiness') <= 0) ||
   (window.gameState.gameController.getStat('village', 'Population') < 10))
}

Controller.prototype.getStat = function(unit, property){
  return (this.units[unit]) ? this.units[unit].stats[property] : false;
}

Controller.prototype.changeStat = function(unit, stat, val){
  if(this.units[unit]){
    this.units[unit].stats[stat] += val;
  }
}

Controller.prototype.addAction = function(value){
  this.controllers.actions.addAction(value);
}

Controller.prototype.removeAction = function(value){
  this.controllers.actions.removeAction(value);
}

Controller.prototype.executeMilestone = function(value){
  this.controllers.milestones.executeMilestone(value);
}

Controller.prototype.message = function(text, color){
  var $msg = $('#message');
  var children = $msg.children();
  var el;
  if(color){
    el = '<p style="color: '+color+';">'+text+'</p>';
  } else {
    el = '<p>'+text+'</p>';
  }
  if(!children.length){
    $msg.prepend(el);
  } else {
    $msg.prepend(el); 
    if(children.length > 2){
      children[2].remove();
    }
    if(children.length > 0){
      $(children[0]).fadeTo(0,0.7);
      $(children[1]).fadeTo(0,0.3);
    }
  }
}

Controller.prototype.initMap = function(map){
  this.controllers.map.init(map);
}
           
Controller.prototype.milestoneIsComplete = function(milestone){
  return this.controllers.milestones.isComplete(milestone);
}

Controller.prototype.combatBounty = function(value){
  return !!value ? this.controllers.combat.bounty[value] : this.controllers.combat.bounty;
}

Controller.prototype.checkSeasonalChange = function(stage){
  // 1-4 is spring 5-8 is summer 9-12 is fall 13-16 is winter
  if(stage === 1){
    this.message('Spring has arrived', 'green');
    this.season = 'spring';
  }
  else if(stage === 5){
    this.message('Summer has arrived', '#E6E600');
    this.season = 'summer';
  }
  else if(stage === 9){
    this.message('Fall has arrived', 'red');
    this.season = 'fall';
  }
  else if(stage === 13){
    this.message('Winter has arrived', 'blue');
    this.season = 'winter';
  }
}