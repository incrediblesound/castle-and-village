var listeners = function(){
	$('.action').on('click', function(){
    $('.units').empty();
    //do all the actions
    var action = this.textContent;
    window.gameState.gameController.controllers['actions'].doAction(action);
    window.gameState.gameController.trigger('step');
  })
}