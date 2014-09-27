var DisasterController = function(){
  System.call(this);

  this.disasters = {
    1: [
      function(){
        if(window.gameState.units.barracks.knights < 7){
          // showAlert('Bandits!','Bandits attacked and stole food!');
          alert('Bandits attacked and stole food!');
          window.gameState.units.village.food -= 10;
        } else {
          alert('Bandits attacked, but you fought them off!')
        }
      },
      function(){
        if(window.gameState.units.domain.fields > 1 && window.gameState.units.village.energy < 5){
          // showAlert('Field Lost','One of your fields was taken back by the wilderness!');
          alert('One of your fields was taken back by the wilderness!');
          window.gameState.units.domain.fields -= 1;
          window.gameState.units.domain.forests += 1;
        }
      },
    ]
  }
}

DisasterController.prototype = Object.create(System.prototype);
DisasterController.prototype.contructor = DisasterController;

DisasterController.prototype.step = function(){
  var player = window.gameState.units.castle;
  var num = Math.floor(Math.random()*10);
    if(num < 2){
      var disasters = this.disasters[player.level];
      var select = Math.floor(Math.random()*disasters.length);
      disasters[select]();
    }
}