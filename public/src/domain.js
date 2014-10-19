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
  if(window.gameState.gameController.stats.level === 0){
    if(window.gameState.gameController.milestoneIsComplete('FirstHut')
      && !window.gameState.gameController.milestoneIsComplete('GatherWood')){
      setTimeout(function(){
        window.gameState.gameController.message('The peasants can\'t gather wood because there are wolves in the forest.')
      }, 2000)
    }
    if((window.gameState.gameController.milestoneIsComplete('GatherWood')
      && !window.gameState.gameController.milestoneIsComplete('Grizzly'))){
      setTimeout(function(){
        window.gameState.gameController.message('The villagers can\'t go fishing because there is a giant bear by the lake.')
      }, 2000)  
    }
  }
  if(this.fieldStatus === 'harvesting'){
    var fields = window.gameState.gameController.getStat('domain', 'Fields');
    window.gameState.gameController.changeStat('village', 'Food', fields);
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
