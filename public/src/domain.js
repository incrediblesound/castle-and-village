var Domain = function(){
  System.call(this);
  this.stats = {
    'Fields': 0,
    'Forests': 10,
    'Peasants': 0,
    'Vineyards': 0,
    'Mines': 0
  }
  this.fieldStatus = null;
}

Domain.prototype = Object.create(System.prototype);
Domain.prototype.constructor = Domain;

Domain.prototype.step = function(){
  if(this.fieldStatus === 'harvesting'){
    var fields = window.gameState.gameController.getStat('domain', 'Fields');
    window.gameState.gameController.changeStat('village', 'Food', fields);
  }
  if(window.gameState.gameController.season === 'spring' && 
     this.fieldStatus !== 'planted' && this.stats.Fields){
    window.gameState.gameController.addAction('plant');
  }
  if(window.gameState.gameController.milestoneIsComplete('Vineyards')){
    this.stats.Peasants += 1;
  }
}

Domain.prototype.makeField = function(){
  if(this.stats['Forests'] > 1){
    this.stats['Fields'] += 1;
    this.stats['Forests'] -= 1;
    return true;
  } else {
    return false;
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
    var num = this.stats[stat];
    if(this.stats.hasOwnProperty(stat) && num){
      if(num < 3 && (stat === 'Forests' || stat === 'Peasants')){
        template.append('<p class="warning"> '+stat+': '+this.stats[stat]+'</p>');
      } else {
        template.append('<p> '+stat+': '+this.stats[stat]+'</p>');
      }
    }
  }
  return template;
}
