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
  $(document).on('click', function(e){
    e.stopImmediatePropagation();
    if(e.target.id === "save"){
      var email = $('#email').val();
      if(!email.length){
        window.gameState.gameController.message('Enter your email to save.', 'red');  
        return;
      } else {
        var game = collectGameData();
        game.email = email;
        $.post('/save', {game: game});
        window.gameState.gameController.message('Game saved.', 'green');
        return false;
      }
    }
    else if(e.target.id === "load"){
      var email = $('#email').val();
      $.get('/load/'+email).then(function(response){
        console.log(response);
        loadGame(response);
      })
      return false;
    }
  });
}

function collectGameData(){
	var results = {};
  results.actions = [];
	forEach(window.gameState.gameController.units, function(unit, unitName){
		results[unitName] = {};
		forEach(unit.stats, function(stat, statName){
			results[unitName][statName] = stat;
		})
	})
  forEach(window.gameState.gameController.controllers.actions.actions, function(action){
    results.actions.push(action.tag);
  })
  results.stage = window.gameState.stage;
  results.milestones = window.gameState.gameController.controllers.milestones.completed;
  return results;
}

function loadGame(gameData){
  window.gameState = {};
  window.gameState.actions = [];
  window.gameState.units = {};
  window.gameState.gameController = new Controller();
  window.gameState.gameController.views['combat'] = new CombatView();
  window.gameState.gameController.views['explore'] = new ExploreView();
  window.gameState.gameController.views['map'] = new MapView();

  window.gameState.gameController.controllers['milestones'] = new MilestoneController();
  window.gameState.gameController.controllers['actions'] = new ActionController();
  window.gameState.gameController.controllers['disasters'] = new DisasterController();
  window.gameState.gameController.controllers['combat'] = new CombatController();
  window.gameState.gameController.controllers['map'] = new MapController();
  window.gameState.gameController.init();
  window.gameState.stage = gameData.stage;
  window.gameState.gameController.controllers.milestones.completed = gameData.milestones.slice();
  forEach(gameData, function(stats, unit){
    if(unit in window.gameState.gameController.units){
      forEach(stats, function(stat, name){
        stat = parseInt(stat);
        window.gameState.gameController.units[unit].stats[name] = stat;
      });
    } 
    else if(unit === 'village'){
      window.gameState.gameController.units['village'] = new Village();
      forEach(stats, function(stat, name){
        stat = parseInt(stat);
        window.gameState.gameController.units[unit].stats[name] = stat;
      });
    }
    else if(unit === 'keep'){
      window.gameState.gameController.units['keep'] = new Keep();
      forEach(stats, function(stat, name){
        stat = parseInt(stat);
        window.gameState.gameController.units[unit].stats[name] = stat;
      });
    }
  });
  forEach(gameData.actions, function(tag){
    window.gameState.gameController.addAction(tag);
  });
  window.gameState.gameController.trigger('step');
};

function actionsToArray(){
  forEach()
}