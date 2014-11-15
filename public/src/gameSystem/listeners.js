var listeners = function(){
	$('.action').on('click', function(){
    var action = this.textContent;
    $('.action').prop('disabled', true);
    $('.timer').width("100%").animate({width: '0%'}, 2000, 'linear', function() {
      $('.action').prop('disabled', false);
    	$('.units').empty();
    //do all the actions
    	window.gameState.gameController.controllers['actions'].doAction(action);
    	window.gameState.gameController.trigger('step');
    });
  })
  $('#save').on('click', function(){
    var email = $('#email').val();
    var game = collectGameData();
    $.post('/save', {game: game});
  })
}

function collectGameData(){
	var results = {};
	window.gameState.gameController.units.forEach(function(unit){
		results[unit] = {};
		unit.stats.forEach(function(stat){
			results[unit][stat] = unit[stat];
		})
	})
}