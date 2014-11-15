$(function(){

  //load action on click and append to list
  $('.action').on('click', function(){
    console.log('hello');
    var text = $(this).text();
    window.gameState.actions.push(text);
    $('.todo').append('<li>'+text+'</li>')
  })

  $('.step').on('click', function(){
    $('.units').empty();
    
    //do all the actions
    for(var i = 0; i < window.gameState.actions.length; i ++){
      var action = window.gameState.actions[i];
      window.gameState.controllers.actionController.doAction(action);
    }

    window.gameState.actions = [];
    
    //render all the units
    //trigger all step functions
    window.gameState.controllers.gameController.trigger('step');
    
    $('.todo').empty();
    //end step function
    $('.action').on('click', function(){
    console.log('hello');
    var text = $(this).text();
    window.gameState.actions.push(text);
    $('.todo').append('<li>'+text+'</li>')
    })
  })
})