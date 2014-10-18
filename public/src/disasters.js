var DisasterController = function(){
  System.call(this);

  this.disasters = {
    Wolf: function(){
      window.gameState.gameController.changeStat('domain','Peasants', -1);
      window.gameState.gameController.message('One of your peasants was eaten by a wolf!', 'red');     
    },
    Bandits: function(){
      window.gameState.gameController.message('Bandits attacked and stole food!');
      window.gameState.gameController.units['village'].food -= 10;
    },
    Wilderness: function(){
      window.gameState.gameController.message('One of your fields was taken back by the wilderness!');
      window.gameState.gameController.units['domain'].fields -= 1;
      window.gameState.gameController.units['domain'].forests += 1;
    }
  }
}

DisasterController.prototype = Object.create(System.prototype);
DisasterController.prototype.contructor = DisasterController;

DisasterController.prototype.doDisaster = function(name){
  this.disasters[name]();
}

DisasterController.prototype.step = function(){
  var check = randomize(10);
  if(check > 4){
    if(window.gameState.gameController.stats.level === 0){
      if(!window.gameState.gameController.milestoneIsComplete('GatherWood') && 
          window.gameState.gameController.milestoneIsComplete('SixPeasants')){
        this.doDisaster('Wolf');
      }
      else if(!window.gameState.gameController.milestoneIsComplete('WalledIn') && 
               window.gameState.gameController.milestoneIsComplete('TwoHuts')){
        this.doDisaster('Bandits');
      }
    }
  }
}

function randomize(max){
  return !!max ? Math.floor(Math.random()*max) : Math.round(Math.random())
}