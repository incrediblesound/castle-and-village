var MilestoneController = function(){
  System.call(this);
  this.completed = [];
}

MilestoneController.prototype = Object.create(System.prototype);

MilestoneController.prototype.complete = function(value){
  return (this.completed.indexOf(value) !== -1)
}

MilestoneController.prototype.step = function(){

  if(castle.hasMaster('Blacksmith') && domain.vineyards > 0){
    if(!this.complete('knights')){
      barracks.knights += 2;
      this.completed.push('knights');
    }
  }

  if(village.hasMaster('Baker')){

  }

}