var storylineMessages = function(){
  if(window.gameState.gameController.getStat('domain', 'Fields') === 1 &&
     window.gameState.gameController.units.domain.fieldStatus !== 'planted'){
    window.gameState.gameController.delayedMessage('Remember to plant your fields in the spring, and harvest them in the fall.', 'red', 1500);
  }
  if(window.gameState.stage === 12 && window.gameState.gameController.units.domain.fieldStatus !== 'harvesting'){
    window.gameState.gameController.delayedMessage('"Sir, a frost is coming, we must harvest the crops immediately!"', null, 1500);
  }
  if(window.gameState.gameController.milestoneIsComplete('FirstHut')
    && !window.gameState.gameController.milestoneIsComplete('GatherWood')){
      window.gameState.gameController.delayedMessage('The peasants can\'t gather wood because there are wolves in the forest.', null, 1500)
  }
  if((window.gameState.gameController.milestoneIsComplete('WalledIn')
    && !window.gameState.gameController.milestoneIsComplete('Grizzly'))){
      window.gameState.gameController.delayedMessage('The villagers can\'t go fishing because there is a giant bear by the lake.', null, 1500)
  }
  if((window.gameState.gameController.milestoneIsComplete('Grizzly')
    && !window.gameState.gameController.milestoneIsComplete('Quarries'))){
      window.gameState.gameController.delayedMessage('Villagers want to find stones to make stronger buildings.', null, 1500)
  }
  if(window.gameState.gameController.milestoneIsComplete('Quarries') &&
    window.gameState.stage === 2){
    $('.game').empty();
    $('.game').append('<h1 class="text-center">That\'s All For Now</h1>')
    $('.game').append('<h3 class="text-center">To contribute, visit the GitHub repository:</h1>')
    $('.game').append('<p class="text-center">https://github.com/incrediblesound/castle-and-village</p>')
  }
}