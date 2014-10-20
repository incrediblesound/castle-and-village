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

      //check and advance game stage
      (window.gameState.stage < 16) ? window.gameState.stage += 1 : window.gameState.stage = 0;

      self.checkSeasonalChange(window.gameState.stage);
      
      // every game unit must step
      for(var unit in self.units){
        if(self.units.hasOwnProperty(unit)){
          self.units[unit].step();
        }
      }

      self.entropy();
      storylineMessages();

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

        // window.gameState.actions = [];
        // // $('.todo').empty();
        // //end step function
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
    window.gameState.gameController.changeStat('village','Food', -1);
    if(window.gameState.gameController.getStat('village','Food') < (Math.round(window.gameState.gameController.units['village'].population/5))){
      window.gameState.gameController.message('The villagers are starving','red');
    }
    if(window.gameState.gameController.units['village'].population < (window.gameState.gameController.units['domain'].fields * 3)){
      // something about low population    
    }
  }
}

Controller.prototype.checkLoseConditions = function(){
  return (window.gameState.gameController.milestoneIsComplete('TwoHuts')) &&
  ((window.gameState.gameController.getStat('domain','Peasants') < 2) ||
   (window.gameState.gameController.getStat('village', 'Food') < 1))
}

Controller.prototype.getStat = function(unit, property){
  return (this.units[unit]) ? this.units[unit].stats[property] : false;
}

Controller.prototype.changeStat = function(unit, stat, val){
  if(this.units[unit] && this.units[unit].stats[stat] !== undefined){
    (typeof val === 'number') ? this.units[unit].stats[stat] += val : this.units[unit].stats[stat] = val;
  } 
  else if(this.units[unit][stat] !== undefined){
    (typeof val === 'number') ? this.units[unit][stat] += val : this.units[unit][stat] = val;  
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

Controller.prototype.delayedMessage = function(text, color, delay){
  var self = this;
  setTimeout(function(){
    self.message(text, color);
  }, delay)
}

Controller.prototype.initMap = function(map){
  this.controllers.map.init(map);
  this.controllers['combat'] = new CombatController();
  this.controllers['combat'].init();
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
    this.delayedMessage('Spring has arrived', 'green', 1500);
    this.addAction('plant');
    this.season = 'spring';
  }
  else if(stage === 5){
    this.delayedMessage('Summer has arrived', '#E6E600', 1500);
    this.removeAction('Send Fishermen to the Lake');
    this.season = 'summer';
  }
  else if(stage === 9){
    this.delayedMessage('Fall has arrived', 'red', 1500);
    this.removeAction('Plant the Fields');
    this.addAction('harvest');
    this.season = 'fall';
  }
  else if(stage === 13){
    this.delayedMessage('Winter has arrived', 'blue', 1500);
    this.removeAction('Harvest the Crops');
    window.gameState.gameController.changeStat('domain', 'fieldStatus', 'sleeping');
    this.season = 'winter';
  }
}

Controller.prototype.getPlayerArmy = function(){
  return this.views.map.getPlayerArmy();
}

Controller.prototype.getBountyForMap = function(){
  return this.views.map.getBountyForMap();
}

Controller.prototype.changeBounty = function(item, value){
  this.controllers.combat.bounty[item] += value
}
