var ExploreView = function(){
	this.state;
}

ExploreView.prototype = Object.create(System.prototype);

ExploreView.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box castle');
  $(template.children()[0]).text('Exploring');
  template.append('<p>'+this.state+'</p>');
  var bounty = window.gameState.gameController.controllers.combat.bounty;
  for(unit in bounty){
  	template.append('<p>'+unit+': '+bounty[unit]+'</p>');
  }
  return template;
}