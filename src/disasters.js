var disasters = {
  1: {
    0: function(){
      if(window.game.barracks.knights < 7){
        // showAlert('Bandits!','Bandits attacked and stole food!');
        alert('Bandits attacked and stole food!');
        window.game.village.food -= 10;
      } else {
        alert('Bandits attacked, but you fought them off!')
      }
    },
    1: function(){
      if(window.game.domain.fields > 1 && window.game.village.energy < 5){
        // showAlert('Field Lost','One of your fields was taken back by the wilderness!');
        alert('One of your fields was taken back by the wilderness!');
        window.game.domain.fields -= 1;
        window.game.domain.forests += 1;
      }
    },
    2: function(){},
    3: function(){}
  }
}