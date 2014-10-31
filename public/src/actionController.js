var ActionController = function(){
  System.call(this);

  var self = this;

  this.actionMap = {
    'Send Fishermen to the Lake': function(){
      window.gameState.gameController.changeStat('village', 'Food', 4);
      window.gameState.gameController.message('The spring catch is bountiful.');
      window.gameState.gameController.removeAction('Send Fishermen to the Lake');
    },
    'Explore the Mountain': function(){
      if(window.gameState.gameController.getStat('domain','Peasants') < 3 &&
         window.gameState.gameController.getStat('village','Villagers') < 4){
        window.gameState.gameController.message('Your population is too small to go on an adventure.')
      } else {
        window.gameState.gameController.initMap('mountain');
      }
    },
    'Build a Tavern': function(){
      window.gameState.gameController.executeMilestone('Tavern');
      window.gameState.gameController.removeAction('Build a Tavern');
    },
    'Plant the Fields': function(){
      window.gameState.gameController.changeStat('domain', 'fieldStatus', 'planted');
      window.gameState.gameController.removeAction('Plant the Fields');
      window.gameState.gameController.message('The peasants work together to plant the fields')
    },
    'Harvest the Crops': function(){
      window.gameState.gameController.changeStat('domain', 'fieldStatus', 'harvesting');
      window.gameState.gameController.removeAction('Harvest the Crops');
    },
    'Build a Hut': function(){
      if(window.gameState.gameController.units['village'] === undefined){
        window.gameState.gameController.executeMilestone('FirstHut');
      } else {
        window.gameState.gameController.changeStat('village','Huts', 1);
        window.gameState.gameController.message('Peasants takes shelter in the new hut.')
        window.gameState.gameController.changeStat('domain','Peasants', -2);
        window.gameState.gameController.changeStat('village','Villagers', 2);
      }
    },
    'Explore the Forest': function(){
      if(window.gameState.gameController.getStat('domain','Peasants') < 3){
        window.gameState.gameController.message('Your peasants are too few to go on an adventure.')
      } else {
        window.gameState.gameController.initMap('forest');
      }
    },
    'Go to the Lake': function(){
      if(window.gameState.gameController.getStat('village','Villagers') < 4){
        window.gameState.gameController.message('Your villagers are too few to go on an adventure.')
      } else {
        window.gameState.gameController.initMap('lake');
      }
    },
    'Build a Wall': function(){
      //message
      window.gameState.gameController.executeMilestone('WalledIn');
      self.removeAction('Build a Wall');
    },
    'Train a Grand Master': function(){
      window.gameState.gameController.changeStat('barracks','knights',-1);
      window.gameState.gameController.changeStat('barracks','gMasters', 1);
    },
    'Hire a Cleric': function(){
      window.gameState.gameController.units['castle'].addMaster('Cleric');
      self.removeAction('Hire a Cleric');
    },
    'Go Questing': function(){
      window.gameState.gameController.initMap('domain');
    },
    'Explore the Catacombs': function(){
      window.gameState.gameController.initMap('catacombs');
    },
    'Build Stables': function(){
      self.removeAction('Build Stables');
      self.addAction('warhorse');
    },
    'Hire a Master Baker': function(){
      window.gameState.gameController.units['village'].addMaster('Baker');
      self.removeAction('Hire a Master Baker');
    },
    'Hire a Swordsman': function(){
      window.gameState.gameController.units['castle'].addMaster('Swordsman');
      self.removeAction('Hire a Swordsman');
    },
    'Build a Granary': function(){
      window.gameState.gameController.units['castle'].addBuilding('Granary');
      self.removeAction('Build a Granary');
    },
    'Build a Church': function(){
      window.gameState.gameController.units['village'].addBuilding('Church');
      window.gameState.gameController.units['village'].energy += 1;
      self.removeAction('Build a Church');
    },
    'Hold a Festival': function(){
      window.gameState.gameController.units['village'].festival();
    },
    'Clear a Field': function(){
      var success = window.gameState.gameController.units['domain'].makeField();
      if(success){
        window.gameState.gameController.message('People come out of the wilderness to help you plant your new field.')
        window.gameState.gameController.changeStat('domain','Peasants', 3);
      }
    },
    'Train a War Horse': function(){
      window.gameState.gameController.units['barracks'].horses += 1;
    },
    'Hire a Blacksmith': function(){
      window.gameState.gameController.units['castle'].addMaster('Blacksmith');
      self.removeAction('Hire a Blacksmith');
    },
    'Collect Taxes': function(){
      window.gameState.gameController.units['village'].deliverTaxes();
    },
    'Plant a Vineyard': function(){
      window.gameState.gameController.units['domain'].makeVineyard();
    }
}

  this.actions = [
    // {action:'Go Questing', type: 'actions', cost: 0},
    // {action:'Hold a Festival', type: 'actions', cost: 25},
    // {action:'Explore the Mountain', type: 'actions', cost: 0},
    {action:'Clear a Field', type: 'actions', cost: 0},
    // {action:'Go to the Lake', type: 'actions', cost: 0}
    // {action:'Explore the Forest', type: 'actions', cost: 0}
    // {action:'Hire a Master Baker', type: 'purchase', cost: 10},
    // {action:'Collect Taxes', type: 'actions', cost: 0},
    // {action:'Build a Church', type: 'purchase', cost: 30},
    // {action:'Explore the Catacombs', type: 'actions', cost: 0}
  ];
}

ActionController.prototype = Object.create(System.prototype);

ActionController.prototype.doAction = function(value){
  var action = this.getAction(value);
  if(action.cost){
    window.gameState.gameController.units['castle'].gold -= action.cost;
  }
  return this.actionMap[value]();
}

ActionController.prototype.addAction = function(value){
  var actionStore = {
    fishing: {action:'Send Fishermen to the Lake', type: 'actions', cost: 0},
    mountain: {action:'Explore the Mountain', type: 'actions', cost: 0},
    tavern: {action: 'Build a Tavern', type: 'actions', cost: 0},
    harvest: {action: 'Harvest the Crops', type: 'actions', cost: 0},
    plant: {action: 'Plant the Fields', type: 'actions', cost: 0},
    forest: {action:'Explore the Forest', type: 'actions', cost: 0},
    lake: {action:'Go to the Lake', type: 'actions', cost: 0},
    granary: {action:'Build a Granary', type: 'actions', cost: 0},
    blacksmith: {action:'Hire a Blacksmith', type: 'actions', cost: 0},
    vineyard: {action:'Plant a Vineyard', type: 'actions', cost: 30},
    wall: {action: 'Build a Wall', type: 'actions', cost: 0},
    hut: {action: 'Build a Hut', type: 'actions', cost: 0},
    warhorse: {action:'Train a War Horse', type: 'purchase', cost: 20},
    grandmaster: {action:'Train a Grand Master', type: 'actions', cost: 30},
    swordsman: {action:'Hire a Swordsman', type: 'actions', cost: 30},
    stables: {action:'Build Stables', type: 'purchase', cost: 15},
    cleric: {action:'Hire a Cleric', type: 'purchase', cost: 20},
    catacombs: {action:'Explore the Catacombs', type: 'actions', cost: 0}
  }
  var inArray = false;
  forEach(this.actions, function(action){
    if(action.action === actionStore[value].action){
      inArray = true;
    }
  })
  if(!inArray){
    this.actions.push(actionStore[value]);
  }
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
    if(!action.cost){
      $('.'+action.type).append('<button class="btn btn-default btn-block action">'+action.action+'</button><br>')
    } else {
      if(window.gameState.gameController.units['castle'].money > action.cost){
        $('.'+action.type).append('<button class="btn btn-default btn-block action">'+action.action+'</button><span> '+action.cost+' Gold</span><br>')
      } 
      else {
        $('.'+action.type).append('<button class="btn btn-default btn-block" disabled="true">'+action.action+'</button><span>Not enough Gold</span><br>')
      }
    }
  })
}
