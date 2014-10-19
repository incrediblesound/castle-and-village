var MilestoneController = function(){
  System.call(this);
  this.completed = [];
  this.milestones = {
    Tavern: function(){
      window.gameState.gameController.message('Travellers stopping by your village spread news of its brave inhabitants.')
      window.gameState.gameController.addAction('mountain');
    },
    FirstHut: function(){
      window.gameState.gameController.units['village'] = new Village();
      window.gameState.gameController.changeStat('domain','peasants', -1);
      window.gameState.gameController.message('A peasant takes up residence in the new hut.')
    },
    SixPeasants: function(){
      window.gameState.gameController.addAction('hut');
      window.gameState.gameController.message('The peasants offer to help you build a hut');
    },
    TwoHuts: function(){
      window.gameState.gameController.addAction('forest');
    },
    GatherWood: function(){
      window.gameState.gameController.addAction('wall');
      window.gameState.gameController.removeAction('Explore the Forest');
      window.gameState.gameController.changeStat('village','Food', 2);
      window.gameState.gameController.message('The wolves no longer bother the peasants when they go out to gather wood.')
    },
    WalledIn: function(){
      window.gameState.gameController.message('Your villagers are much safe now in their walled village.');
      window.gameState.gameController.removeAction('wall');
      window.gameState.gameController.addAction('tavern');
      window.gameState.gameController.addAction('lake');
    },
    Grizzly: function(){
      window.gameState.gameController.message('The villagers can go fishing now!');
      window.gameState.gameController.removeAction('Go to the Lake');
    },
    GrandMaster: function(){
      window.gameState.gameController.addAction('grandmaster');
    },
    Knights: function(){
      window.gameState.gameController.units['barracks'].knights += 2;
      window.gameState.gameController.addAction('swordsman');
    },
    Provide: function(){
      window.gameState.gameController.units['village'].happiness += 1;
      window.gameState.gameController.units['village'].energy += 1;
    },
    Level2: function(){
      window.gameState.gameController.level = 2;
      window.gameState.gameController.units['castle'].money += 60;
      window.gameState.gameController.addAction('stables');
      window.gameState.gameController.addAction('cleric');
      window.gameState.gameController.addAction('catacombs');
    }
  }
}

MilestoneController.prototype = Object.create(System.prototype);

MilestoneController.prototype.isComplete = function(value){
  return (this.completed.indexOf(value) !== -1)
}

MilestoneController.prototype.addToComplete = function(value){
  this.completed.push(value);
}

MilestoneController.prototype.executeMilestone = function(value){
  if(!this.isComplete(value)){
    this.completed.push(value);
    this.milestones[value]();
  }
}

MilestoneController.prototype.step = function(){
  // level 0 milestones
  if(window.gameState.gameController.stats.level === 0){
    if(window.gameState.gameController.getStat('domain','Peasants') > 6){
      this.executeMilestone('SixPeasants');
    }
    if(window.gameState.gameController.getStat('village','Huts') > 1){
      this.executeMilestone('TwoHuts');
    }
    if(window.gameState.gameController.stats.wolves > 5){
      this.executeMilestone('GatherWood');
    }
    if(window.gameState.gameController.stats.bear > 0){
      this.executeMilestone('Grizzly');
    }
  }
  // end level 0 milestones
  // level 1 milestones
  if(window.gameState.gameController.stats.level === 1){
    if(window.gameState.gameController.units['castle'].hasMaster('Blacksmith') && window.gameState.gameController.units['domain'].vineyards > 0){
      this.executeMilestone('Knights');
    }

    if(window.gameState.gameController.units['village'].hasMaster('Baker') && window.gameState.gameController.units['village'].hasBuilding('Church')){
      this.addToComplete('Provide');
    }

    if(this.isComplete('Provide') && this.isComplete('Knights')){
      if(window.gameState.gameController.stats.level < 2){
        this.executeMilestone('Level2');
      }
    }
    if(window.gameState.gameController.units['castle'].hasMaster('Swordsman') && window.gameState.gameController.units['castle'].hasMaster('Cleric')){
      this.executeMilestone('GrandMaster');
    }
  }
  // end level 1 milestones
}