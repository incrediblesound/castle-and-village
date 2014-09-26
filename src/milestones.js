var milestones = {
  'knights': false
}

var milestoneConditions = function(){
  if(castle.masters.indexOf('Blacksmith') !== -1 && domain.vineyards > 0){
    if(!milestones['knights']){
      barracks.knights += 2;
      milestones.knights = true;
    }
  }
}