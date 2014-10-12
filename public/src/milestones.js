var MilestoneController = function(){
  System.call(this);
  this.completed = [];
  this.milestones = {
    'GrandMaster': function(){
      window.gameState.controllers.actionController.addAction('grandmaster');
    },
    'Knights': function(){
      window.gameState.units.barracks.knights += 2;
      window.gameState.controllers.actionController.addAction('swordsman');
    },
    'Provide': function(){
      window.gameState.units.village.happiness += 1;
      window.gameState.units.village.energy += 1;
    },
    'Level2': function(){
      window.gameState.units.castle.level += 1;
      window.gameState.units.castle.money += 60;
      window.gameState.controllers.actionController.addAction('stables');
      window.gameState.controllers.actionController.addAction('cleric');
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

  if(window.gameState.units.castle.hasMaster('Blacksmith') && window.gameState.units.domain.vineyards > 0){
    this.executeMilestone('Knights');
  }

  if(window.gameState.units.village.hasMaster('Baker') && window.gameState.units.village.hasBuilding('Church')){
    this.addToComplete('Provide');
  }

  if(this.isComplete('Provide') && this.isComplete('Knights')){
    if(window.gameState.units.castle.level < 2){
      this.executeMilestone('Level2');
    }
  }
  if(window.gameState.units.castle.hasMaster('Swordsman') && window.gameState.units.castle.hasMaster('Cleric')){
    this.executeMilestone('GrandMaster');
  }
}