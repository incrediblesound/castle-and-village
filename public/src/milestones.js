var MilestoneController = function(){
  System.call(this);
  this.completed = [];
  this.milestones = {
    'FirstField': function(){
      window.gameState.gameController.units['village'] = new Village();
      // this and the other milestones should create a message
    },
    'GrandMaster': function(){
      window.gameState.gameController.controllers['actions'].addAction('grandmaster');
    },
    'Knights': function(){
      window.gameState.gameController.units['barracks'].knights += 2;
      window.gameState.gameController.controllers['actions'].addAction('swordsman');
    },
    'Provide': function(){
      window.gameState.gameController.units['village'].happiness += 1;
      window.gameState.gameController.units['village'].energy += 1;
    },
    'Level2': function(){
      window.gameState.gameController.level += 1;
      window.gameState.gameController.units['castle'].money += 60;
      window.gameState.gameController.controllers['actions'].addAction('stables');
      window.gameState.gameController.controllers['actions'].addAction('cleric');
      window.gameState.gameController.controllers['actions'].addAction('catacombs');
    },
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
  if(window.gameState.gameController.level === 0){
    if(window.gameState.gameController.getStat('domain','Fields') > 0){
      this.executeMilestone('FirstField');
    }
  }
  // end level 0 milestones
  // level 1 milestones
  if(window.gameState.gameController.level === 1){
    if(window.gameState.gameController.units['castle'].hasMaster('Blacksmith') && window.gameState.gameController.units['domain'].vineyards > 0){
      this.executeMilestone('Knights');
    }

    if(window.gameState.gameController.units['village'].hasMaster('Baker') && window.gameState.gameController.units['village'].hasBuilding('Church')){
      this.addToComplete('Provide');
    }

    if(this.isComplete('Provide') && this.isComplete('Knights')){
      if(window.gameState.gameController.level < 2){
        this.executeMilestone('Level2');
      }
    }
    if(window.gameState.gameController.units['castle'].hasMaster('Swordsman') && window.gameState.gameController.units['castle'].hasMaster('Cleric')){
      this.executeMilestone('GrandMaster');
    }
  }
  // end level 1 milestones
}