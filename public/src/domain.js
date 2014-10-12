var Domain = function(){
  System.call(this);
  this.stats = {
    'Fields': 0,
    'Forests': 10,
    // 'mountains': 3,
    // 'lakes': 2,
    'Mineyards': 0,
    'Mines': 0
  }
}

Domain.prototype = Object.create(System.prototype);
Domain.prototype.constructor = Domain;

Domain.prototype.step = function(){

}

Domain.prototype.makeField = function(){
  if(this.stats['Forests'] > 0){
    this.stats['Fields'] += 1;
    this.stats['Forests'] -= 1;
  }
}

Domain.prototype.makeVineyard = function(){
  if(this.stats['Fields'] > 2){
    this.stats['Fields'] -= 1;
    this.stats['Vineyards'] += 1;
  }
}

Domain.prototype.makeMine = function(){
  //probably remove this in favor of mine discovery in map
  if(this.mountains > 0){
    this.mountains -= 1;
    this.mines += 1;
  }
}

Domain.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box domain');
  $(template.children()[0]).text('DOMAIN');
  for(var stat in this.stats){
    if(this.stats.hasOwnProperty(stat) && this.stats[stat]){
      template.append('<p> '+stat+': '+this.stats[stat]+'</p>');
    }
  }
  return template;
}