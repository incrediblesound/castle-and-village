var storylineMessages = function(){
  if(window.gameState.gameController.milestoneIsComplete('FirstHut')
    && !window.gameState.gameController.milestoneIsComplete('GatherWood')){
      window.gameState.gameController.delayedMessage('The peasants can\'t gather wood because there are wolves in the forest.', null, 1500)
  }
  if((window.gameState.gameController.milestoneIsComplete('GatherWood')
    && !window.gameState.gameController.milestoneIsComplete('Grizzly'))){
      window.gameState.gameController.delayedMessage('The villagers can\'t go fishing because there is a giant bear by the lake.', null, 1500)
  }
  if((window.gameState.gameController.milestoneIsComplete('Grizzly')
    && !window.gameState.gameController.milestoneIsComplete('Vineyards'))){
      window.gameState.gameController.delayedMessage('Villagers want to plant a vineyard on the mountain, but it\'s too dangerous there.', null, 1500)
  }
  if(window.gameState.gameController.milestoneIsComplete('Vineyards') &&
    window.gameState.stage === 2){
    $('.game').empty();
    $('.game').append('<h1 class="text-center">That\'s All For Now</h1>')
    $('.game').append('<h3 class="text-center">To contribute, visit the GitHub repository:</h1>')
    $('.game').append('<p class="text-center">https://github.com/incrediblesound/castle-and-village</p>')
  }
}