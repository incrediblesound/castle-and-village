$(function(){

  $('#alert-button').on('click', function(){
    $('.alerta').css("display", "none");
  })

  populateActions();

  //load action on click and append to list
  $('.action').on('click', function(){
    console.log('hello');
    var text = $(this).text();
    gameData.actions.push(text);
    $('.todo').append('<li>'+text+'</li>')
  })

  $('.step').on('click', function(){
    $('.units').empty();
    
    //do all the actions
    for(var i = 0; i < gameData.actions.length; i ++){
      actionMap[gameData.actions[i]]();
    }
    gameData.actions = [];

    //castle dependents use up food
    castle.food -= barracks.knights;

    //check for milestones
    milestoneConditions()
    
    //render all the units
    gameController.trigger('step');
    
    //generate a random disaster
    var checkforDisaster = Math.floor(Math.random()*10);
    if(checkforDisaster < 2){
      //var select = Math.floor(Math.random()*4);
      disasters[player.level][0]();
    }
    
    //check and advance game stage
    if(gameData.stage < 24){
      gameData.stage += 1;
    } else {
      gameData.stage = 0;
    }
    $('.todo').empty();
    //end step function
  })
})