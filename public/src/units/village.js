var Village = function() {
  System.call(this);
  this.stats = {
    'Villagers': 1,
    'Huts': 1,
    'Food': 5,
    'Wood': 0
    // 'Happiness':0,
    // 'Vitality':0
  }
  this.growth = 0.1;
  this.masters = [];
  this.buildings = [];
}

Village.prototype = Object.create(System.prototype);
Village.prototype.constructor = Village;

Village.prototype.hasMaster = function(value){
  return (this.masters.indexOf(value) !== -1)
}

Village.prototype.hasBuilding = function(value){
  return (this.buildings.indexOf(value) !== -1)
}

Village.prototype.addMaster = function(value){
  this.masters.push(value);
}

Village.prototype.addBuilding = function(value){
  this.buildings.push(value);
}


Village.prototype.festival = function(){
  this.growth += 0.1;
  this.stats['Vitality'] -= 1;
  if(this.stats['Happiness'] < 9){
    this.stats['Happiness'] += 2;
  }
}

Village.prototype.deliverTaxes = function(){
  window.gameState.gameController.units['castle'].money += this.population;
  this.stats['Happiness'] -= 1;
}

Village.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box village');
  $(template.children()[0]).text('VILLAGE');
  for(var stat in this.stats){
    var num = this.stats[stat];
    if(this.stats.hasOwnProperty(stat) && num){
      if(num < 3 && (stat === 'Villagers' || stat === 'Food')){
        template.append('<p class="warning"> '+stat+': '+this.stats[stat]+'</p>');
      } else {
        template.append('<p> '+stat+': '+this.stats[stat]+'</p>');
      }
    }
  }
  return template;
}

Village.prototype.step = function(){

  if(window.gameState.gameController.season === 'spring' && window.gameState.gameController.milestoneIsComplete('Grizzly')){
    window.gameState.gameController.addAction('fishing');
  }

  if(window.gameState.gameController.milestoneIsComplete('Tavern')){
    this.stats.Villagers += 1;
  }

  if(window.gameState.gameController.milestoneIsComplete('GatherWood')){
    this.stats.wood += 10;
  }

}