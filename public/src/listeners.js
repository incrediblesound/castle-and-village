var listeners = function(){
	$('.action').on('click', function(){
    var action = this.textContent;
    $('.action').prop('disabled', true);
    $('.timer').width("100%").animate({width: '0%'}, 1500, 'linear', function() {
      $('.action').prop('disabled', false);
    $('.units').empty();
    //do all the actions
    window.gameState.gameController.controllers['actions'].doAction(action);
    window.gameState.gameController.trigger('step');
    });
  })
}