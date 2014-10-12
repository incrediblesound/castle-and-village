var CombatController = function(){
  this.unitTypes = {
    bandits: function(){ return {name: 'bandit', health: 4, attack: 1, gold: 5} },
    knights: function(){ return {name: 'knight', health: 4, attack: 2} },
    cavalry: function(){ return {name: 'cavalry', health: 5, attack: 3} },
    wizards: function(){ return {name: 'wizard', health: 2, attack: 4} },
    gMasters: function(){ return {name: 'Grand Master', health: 5, attack: 4}}
  }
  this.hitAbove = 11;
  this.combatHistory = [];
  this.playerArray = [];
  this.opponentArray = [];
  this.bounty = {
    gold: 0,
    treasures: []
  }
}

CombatController.prototype.init = function(){
  if(!this.playerArmy){
    this.playerArmy = {
      knights: window.gameState.gameController.units['barracks'].knights - 2,
      cavalry: window.gameState.gameController.units['barracks'].horses,
      wizards: window.gameState.gameController.units['castle'].wizards
    };
    window.gameState.gameController.units['barracks'].knights = 2;
    window.gameState.gameController.units['barracks'].horses = 0;
    window.gameState.gameController.units['castle'].wizards = 0;
  }
  //this.playerTotal = this.playerArmy.knights + this.playerArmy.cavalry + this.playerArmy.wizards;

  this.opponentArmy = window.gameState.gameController.views['map'].getEnemies();
  this.makeCombatArray()

  window.gameState.gameController.views['explore'].state = 'You encounter hostile ' + this.opponentArmy[0];
  this.render();
}

CombatController.prototype.fight = function(){
  var self = this;
  var choose = function() {
    return Math.round(Math.random()*20);
  }
  var randomPlayer = function() { 
    return Math.round(Math.random()*(self.playerArray.length-1));
  }
  var randomEnemy = function() { 
    return Math.round(Math.random()*(self.opponentArray.length-1));
  }
  $('.attack-select').on('click', function(){
    debugger;
    var roll
    if(self.checkHistory()){
      roll = 20;
    } else {
      roll = choose(); // decides if player hits or opponent hits
    }
    var playerIndex = parseInt(this.id); // choose which player
    playerUnit = self.playerArray[playerIndex];
    var enemyIndex = randomEnemy(); // choose which opponent
    enemyUnit = self.opponentArray[enemyIndex];
    if(roll > this.hitAbove) {
      enemyUnit.health -= playerUnit.attack;
      self.combatHistory.push('player');
      if(enemyUnit.health <= 0){
        self.opponentArray.splice(enemyIndex, 1);
        self.bounty.gold += enemyUnit.gold;
        alert('Your '+playerUnit.name+' killed a '+enemyUnit.name+'.');
      } else {
        alert('Your '+playerUnit.name+' did '+playerUnit.attack+' damage to a '+enemyUnit.name+'.')
      }
    } else {
      playerUnit.health -= enemyUnit.attack;
      self.combatHistory.push('enemy');
      if(playerUnit.health <= 0){
        self.playerArray.splice(playerIndex, 1);
        alert('Your '+playerUnit.name+' was killed by a '+enemyUnit.name+'.')
      } else {
        alert('Your '+playerUnit.name+' recieved '+enemyUnit.attack+' damage from a '+enemyUnit.name+'.')
      }
    }
    self.render();
    self.fight();
    if(self.playerArray.length === 0){
    alert('you loose');
    window.gameState.controllers.mapController.goHome();

    } 
    else if(self.opponentArray.length === 0) {
    window.gameState.controllers.mapController.changeState("exploring");
    alert('You defeated the bandits and collected '+self.bounty.gold+' gold pieces.');
    }
  })
  $('#flee').on('click', function(){
    var playerIndex = randomPlayer();
    var playerUnit = self.playerArray[playerIndex];
    var enemyIndex = randomEnemy(); // choose which opponent
    enemyUnit = self.opponentArray[enemyIndex];
    playerUnit.health -= enemyUnit.attack;
      if(playerUnit.health <= 0){
        self.playerArray.splice(playerIndex, 1);
        alert('Your '+playerUnit.name+' was killed by a '+enemyUnit.name+'.')
      } else {
        alert('Your '+playerUnit.name+' recieved '+enemyUnit.attack+' damage from a '+enemyUnit.name+'.')
      }
      self.opponentArray = [];
      self.bounty.gold = 0;
      // some message about escaping
      // window.gameState.gameController.views['explore'] = "Just barely escaped!";
      $('.units').empty()
      window.gameState.gameController.controllers['map'].state = "exploring";
      $('.units').append(window.gameState.gameController.views['explore'].render());
  })

}

CombatController.prototype.makeCombatArray = function(){
  var unit;
  $.each(this.opponentArmy, function(unitData){
    for(var i = 0; i < unitData[1]; i++){
      unit = this.unitTypes[unit[0]]();
      this.opponentArray.push(unit);
    }
  })
  if(!this.playerArray.length){
    for(var type in this.playerArmy){
      number = this.playerArmy[type];
      for(var i = 0; i < number; i++){
        unit = this.unitTypes[type]();
        this.playerArray.push(unit);
      }
    }
  }
}

CombatController.prototype.checkHistory = function(value){
  if(this.combatHistory.length > 3){
    var recent3 = this.combatHistory.splice(this.combatHistory.length-4, this.combatHistory.length);
    if(recent3.indexOf('player') === -1){
      this.combatHistory = [];
      return true;
    }
  } else {
    return false;
  }
}

CombatController.prototype.render = function(){
  $('.units').empty();
  $('.units').append(window.gameState.gameController.views['explore'].render());
  $('.units').append(window.gameState.gameController.views['combat'].render());
}