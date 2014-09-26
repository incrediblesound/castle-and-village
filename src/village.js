var Village = function() {
  System.call(this);
  this.population = 25;
  this.growth = 0.1;
  this.food = 25;
  this.happiness = 2;
  this.energy = 5;
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

Village.prototype.step = function(){
  if(window.gameState.stage % 3 === 0){
    this.population += Math.round(this.population * this.growth);
  }

  if(this.food < (Math.round(this.population/5))){
    this.population -= 10;
    this.happiness -= 1;
  }
  //harvest time
  if(window.gameState.stage % 12 === 0){
    var harvest = (this.energy * window.game.domain.fields);

    var claimed = parseInt(prompt('The harvest was '+harvest+' units. How much will you claim?'));
    if(claimed > Math.floor(harvest/2)){
      this.happiness -= 1;
    }
    window.gameState.units.castle.food += claimed;
  }

}

Village.prototype.festival = function(){
  this.growth += 0.1;
  this.energy -= 1;
  if(this.happiness < 9){
    this.happiness += 2;
  }
}

Village.prototype.deliverTaxes = function(){
  window.game.castle.money += this.population;
  this.happiness -= 2;
}

Village.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box village');
  $(template.children()[0]).text('VILLAGE');
  template.append('<p> Population:     '+this.population+'</p>');
  template.append('<p> Food:    '+this.food+'</p>');
  template.append('<p> Happiness:  '+this.happiness+'</p>');
  return template;
}