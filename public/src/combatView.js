var CombatView = function(){

}

CombatView.prototype = Object.create(System.prototype);

CombatView.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box');
  //enemy is an array ['name', number]
  var enemy = window.gameState.controllers.combatController.opponentArray;
  var player = window.gameState.controllers.combatController.playerArray;
  $(template.children()[0]).text('Encounter');
  for(var e = 0; e < enemy.length; e++){
    template.append('<p> Enemy: '+enemy[e].name+', Health: '+enemy[e].health+'</p>');
  }
  template.append('<p> Your Army: </p>')
  for(var p = 0; p < player.length; p++){
    template.append('<p>'+player[p].name+', Health: '+player[p].health+' Attack: '+player[p].attack+' - <button id="'+p+'" class="attack-select">Attack</button></p>');
  }
  template.append('<button id="flee">Flee</button>')
  return template;
}