var MilestoneController = function(){
  System.call(this);
  this.completed = [];
}

MilestoneController.prototype = Object.create(System.prototype);

MilestoneController.prototype.complete = function(value){
  return (this.completed.indexOf(value) !== -1)
}

MilestoneController.prototype.step = function(){

  if(window.gameState.units.castle.hasMaster('Blacksmith') && domain.vineyards > 0){
    if(!this.complete('knights')){
      window.gameState.units.barracks.knights += 2;
      this.completed.push('knights');
    }
  }

  if(window.gameState.units.village.hasMaster('Baker')){

  }

}