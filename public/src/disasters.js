var DisasterController = function(){
  System.call(this);

  this.disasterMap = {
    badits: [1, 0],
    wilderness: [1, 1]
  }

  this.disasters = {
    0: [],
    1: [
      function(){
        if(window.gameState.gameController.units['barracks'].knights < 7){
          // showAlert('Bandits!','Bandits attacked and stole food!');
          alert('Bandits attacked and stole food!');
          window.gameState.gameController.units['village'].food -= 10;
        } else {
          alert('Bandits attacked, but you fought them off!')
        }
      },
      function(){
        if(window.gameState.gameController.units['domain'].fields > 1 && window.gameState.gameController.units['village'].energy < 5){
          // showAlert('Field Lost','One of your fields was taken back by the wilderness!');
          alert('One of your fields was taken back by the wilderness!');
          window.gameState.gameController.units['domain'].fields -= 1;
          window.gameState.gameController.units['domain'].forests += 1;
        }
      },
    ],
    2: [
      function(){}
    ]
  }
}

DisasterController.prototype = Object.create(System.prototype);
DisasterController.prototype.contructor = DisasterController;

DisasterController.prototype.doDisaster = function(name){
  var location = this.disasterMap[name];
  this.disasters[location[0]][location[1]]();
}

DisasterController.prototype.step = function(){
  var num = Math.floor(Math.random()*10);
    if(num < 2){
      var disasters = this.disasters[window.gameState.gameController.level];
      if(disasters.length > 0){
        var select = Math.floor(Math.random()*disasters.length);
        disasters[select]();
      }
    }
}