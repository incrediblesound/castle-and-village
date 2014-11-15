var Keep = function(){
  System.call(this);
  this.stats = {
    knights: 2,
    wizards: 0,
  }
}

Keep.prototype = Object.create(System.prototype);
Keep.prototype.contructor = Keep;

Keep.prototype.step = function(){

window.gameState.gameController.changeStat('domain', 'Peasants', 1);
window.gameState.gameController.changeStat('village', 'Villagers', 1);

}

Keep.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box keep');
  $(template.children()[0]).text('KEEP');
  for(var stat in this.stats){
    var num = this.stats[stat];
    if(this.stats.hasOwnProperty(stat) && num){
      template.append('<p> '+stat+': '+this.stats[stat]+'</p>');
    }
  }
  return template;
}