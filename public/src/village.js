var Village = function() {
  System.call(this);
  this.stats = {
    'Population': 0,
    'Food': 0,
    'Happiness':0,
    'Vitality':0
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
    if(this.stats.hasOwnProperty(stat) && this.stats[stat]){
      template.append('<p> '+stat+': '+this.stats[stat]+'</p>');
    }
  }
  return template;
}

Village.prototype.step = function(){

  //increment population every cycle of three
  if(window.gameState.stage % 3 === 0){
    this.population += Math.round(this.population * this.growth);
  }

  //harvest time
  if(window.gameState.stage % 12 === 0){
    var harvest = (this.energy * window.gameState.gameController.units['domain'].fields);

    var claimed = parseInt(prompt('The harvest was ' + harvest + ' units. How much will you claim?'));
    if(claimed > Math.floor(harvest/2)){
      this.stats['Happiness'] -= 1;
    }
    harvest = harvest - claimed;
    window.gameState.gameController.units['castle'].food += claimed;
    window.gameState.gameController.units['village'].food += harvest;
  }
}