$(function(){

  $('#alert-button').on('click', function(){
    $('.alerta').css("display", "none");
  })
  //load action on click and append to list
  $('.action').on('click', function(){
    var text = $(this).text();
    gameData.actions.push(text);
    $('.todo').append('<li>'+text+'</li>')
  })

  $('.step').on('click', function(){
    $('.units').empty();
    
    //do all the actions
    for(var i = 0; i < gameData.actions.length; i ++){
      var action = gameData.actions[i];
      actionController.doAction(action);
    }

    gameData.actions = [];
    
    //render all the units
    //trigger all step functions
    gameController.trigger('step');
    
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