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
    && !window.gameState.gameController.milestoneIsComplete('Mountain'))){
      window.gameState.gameController.delayedMessage('Villagers want to plant a vineyard on the mountain, but it\'s too dangerous there.', null, 1500)
  }
}