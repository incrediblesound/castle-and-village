var ExploreView = function(){
	this.state = 'Exploring your domain...';
}

ExploreView.prototype = Object.create(System.prototype);

ExploreView.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box castle');
  $(template.children()[0]).text('Exploring');
  template.append('<p>'+this.state+'</p>');
  template.append('<p> Gold: '+window.gameState.controllers.combatController.bounty.gold+' pcs</p>');
  template.append('<p> Treasures: '+window.gameState.controllers.combatController.bounty.treasures.join(' ')+'</p>');
  return template;
}