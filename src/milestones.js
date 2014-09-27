var MilestoneController = function(){
  System.call(this);
  this.completed = [];
  this.milestones = {
    'Knights': function(){
      window.gameState.units.barracks.knights += 2;
      window.gameState.controllers.actionController.addAction({action:'Hire a Swordsman', type: 'purchase', cost: 30});
    },
    'Provide': function(){
      window.gameState.units.village.happiness += 1;
      window.gameState.units.village.energy += 1;
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
  this.milestones[value]();
}

MilestoneController.prototype.step = function(){

  if(window.gameState.units.castle.hasMaster('Blacksmith') && window.gameState.units.domain.vineyards > 0){
    if(!this.isComplete('Knights')){
      this.addToComplete('Knights');
      this.executeMilestone('Knights');
    }
  }

  if(window.gameState.units.village.hasMaster('Baker') && window.gameState.units.village.hasBuilding('Church')){
    if(!this.isComplete('Provide')){
      this.addToComplete('Provide');
    }
  }

}