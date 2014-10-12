var ActionController = function(){
  System.call(this);

  var self = this;

  this.actionMap = {
    'Train a Grand Master': function(){
      window.gameState.units.barracks.knights -= 1;
      window.gameState.units.barracks.gMasters += 1;
    },
    'Hire a Cleric': function(){
      window.gameState.units.castle.addMaster('Cleric');
      self.removeAction('Hire a Cleric');
    },
    'Go Questing': function(){
      window.gameState.controllers.combatController = new CombatController();
      window.gameState.controllers.mapController.init('domain');
      window.gameState.controllers.gameController.state = 'outside';
    },
    'Explore the Catacombs': function(){
      window.gameState.controllers.combatController = new CombatController();
      window.gameState.controllers.mapController.init('catacombs');
      window.gameState.controllers.gameController.state = 'outside';
    },
    'Build Stables': function(){
      self.removeAction('Build Stables');
      self.addAction('warhorse');
    },
    'Hire a Master Baker': function(){
      window.gameState.units.village.addMaster('Baker');
      self.removeAction('Hire a Master Baker');
    },
    'Hire a Swordsman': function(){
      window.gameState.units.castle.addMaster('Swordsman');
      self.removeAction('Hire a Swordsman');
    },
    'Build a Granary': function(){
      window.gameState.units.castle.addBuilding('Granary');
      self.removeAction('Build a Granary');
    },
    'Build a Church': function(){
      window.gameState.units.village.addBuilding('Church');
      window.gameState.units.village.energy += 1;
      self.removeAction('Build a Church');
    },
    'Hold a Festival': function(){
      window.gameState.units.village.festival();
    },
    'Clear a Field': function(){
      window.gameState.units.domain.makeField();
    },
    'Train a War Horse': function(){
      window.gameState.units.barracks.horses += 1;
    },
    'Hire a Blacksmith': function(){
      window.gameState.units.castle.masters.push('Blacksmith');
      self.removeAction('Hire a Blacksmith');
    },
    'Collect Taxes': function(){
      window.gameState.units.village.deliverTaxes();
    },
    'Plant a Vineyard': function(){
      window.gameState.units.domain.makeVineyard();
    }
}

  this.actions = [
    {action:'Go Questing', type: 'actions', cost: 0},
    {action:'Hold a Festival', type: 'actions', cost: 25},
    {action:'Clear a Field', type: 'actions', cost: 15},
    {action:'Hire a Blacksmith', type: 'purchase', cost: 20},
    {action:'Build a Granary', type: 'purchase', cost: 20},
    {action:'Hire a Master Baker', type: 'purchase', cost: 10},
    {action:'Collect Taxes', type: 'actions', cost: 0},
    {action:'Plant a Vineyard', type: 'actions', cost: 30},
    {action:'Build a Church', type: 'purchase', cost: 30},
    {action:'Explore the Catacombs', type: 'actions', cost: 0}
  ];
}

ActionController.prototype = Object.create(System.prototype);

ActionController.prototype.doAction = function(value){
  var action = this.getAction(value);
  window.gameState.units.castle.money -= action.cost;
  return this.actionMap[value]();
}

ActionController.prototype.addAction = function(value){
  var actionStore = {
    'warhorse': {action:'Train a War Horse', type: 'purchase', cost: 20},
    'grandmaster': {action:'Train a Grand Master', type: 'actions', cost: 30},
    'swordsman': {action:'Hire a Swordsman', type: 'actions', cost: 30},
    'stables': {action:'Build Stables', type: 'purchase', cost: 15},
    'cleric': {action:'Hire a Cleric', type: 'purchase', cost: 20},
    'catacombs': {action:'Explore the Catacombs', type: 'actions', cost: 0}
  }
  this.actions.push(actionStore[value]);
}

ActionController.prototype.getAction = function(value){
  this.actions.push(value);
  for(var i = 0; i < this.actions.length; i++){
    if(this.actions[i].action === value){
      return this.actions[i];
    };
  };
}

ActionController.prototype.removeAction = function(value){
  for(var i = 0; i < this.actions.length; i++){
    if(this.actions[i].action === value){
      this.actions.splice(i, 1);
    };
  };
};

ActionController.prototype.step = function(){
  $('.actions').empty();
  $('.purchase').empty();
  this.actions.forEach(function(action){
    if(window.gameState.units.castle.money > action.cost){
    $('.'+action.type).append('<button class="action">'+action.action+'</button><span> '+action.cost+' Gold</span><br>')
    } else {
    $('.'+action.type).append('<button disabled="true">'+action.action+'</button><span>Not enough Gold</span><br>')
    }
  })
}
