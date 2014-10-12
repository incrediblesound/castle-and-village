var CombatController = function(){
  this.enemies = {
    bandits: ['bandits', 3]
  }

  this.unitTypes = {
    bandits: function(){ return {name: 'bandit', health: 4, attack: 1, gold: 5} },
    knights: function(){ return {name: 'knight', health: 4, attack: 2} },
    cavalry: function(){ return {name: 'cavalry', health: 5, attack: 3} },
    wizards: function(){ return {name: 'wizard', health: 2, attack: 4} },
    gMasters: function(){ return {name: 'Grand Master', health: 5, attack: 4}}
  }
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
      knights: window.gameState.units.barracks.knights - 2,
      cavalry: window.gameState.units.barracks.horses,
      wizards: window.gameState.units.castle.wizards
    };
    window.gameState.units.barracks.knights = 2;
    window.gameState.units.barracks.horses = 0;
    window.gameState.units.castle.wizards = 0;
  }
  //this.playerTotal = this.playerArmy.knights + this.playerArmy.cavalry + this.playerArmy.wizards;

  this.opponentArmy = this.enemies.bandits;
  this.makeCombatArray()

  window.gameState.units.exploreView.state = 'You encounter hostile ' + this.opponentArmy[0];
  $('.units').empty();
  $('.units').append(window.gameState.units.exploreView.render());
  $('.units').append(window.gameState.units.combatView.render());
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
    if(roll > 11 - (window.gameState.units.castle.level-1)) {
      enemyUnit.health -= playerUnit.attack;
      if(enemyUnit.health <= 0){
        self.opponentArray.splice(enemyIndex, 1);
        self.bounty.gold += enemyUnit.gold;
        self.combatHistory.push('player');
        alert('Your '+playerUnit.name+' killed a '+enemyUnit.name+'.');
      } else {
        alert('Your '+playerUnit.name+' did '+playerUnit.attack+' damage to a '+enemyUnit.name+'.')
      }
    } else {
      playerUnit.health -= enemyUnit.attack;
      if(playerUnit.health <= 0){
        self.playerArray.splice(playerIndex, 1);
        self.combatHistory.push('enemy');
        alert('Your '+playerUnit.name+' was killed by a '+enemyUnit.name+'.')
      } else {
        alert('Your '+playerUnit.name+' recieved '+enemyUnit.attack+' damage from a '+enemyUnit.name+'.')
      }
    }
    $('.units').empty()
    $('.units').append(window.gameState.units.exploreView.render());
    $('.units').append(window.gameState.units.combatView.render());
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
      window.gameState.controllers.mapController.state = "exploring";
      window.gameState.units.exploreView.state = "Just barely escaped!";
      self.opponentArray = [];
      self.bounty.gold = 0;
      $('.units').empty()
      $('.units').append(window.gameState.units.exploreView.render());
  })

}

CombatController.prototype.makeCombatArray = function(){
  var unit;
  for(var i = 0; i < this.opponentArmy[1]; i++){
    unit = this.unitTypes[this.opponentArmy[0]]();
    this.opponentArray.push(unit);
  }
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