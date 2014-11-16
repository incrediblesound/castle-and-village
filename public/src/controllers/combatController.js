var CombatController = function(){
  this.unitTypes = {
    villagers: function(){ return {name: 'villager', health: 1, attack: 2}},
    ravens: function(){ return {name: 'raven', health: 2, attack: 1}},
    bandits: function(){ return {name: 'bandit', health: 4, attack: 1, bounty:['gold',5]} },
    knights: function(){ return {name: 'knight', health: 4, attack: 2} },
    cavalry: function(){ return {name: 'cavalry', health: 5, attack: 3} },
    wizards: function(){ return {name: 'wizard', health: 2, attack: 4} },
    bear: function(){ return {name: 'bear', health: 5, attack: 1, bounty: ['bear', 1]}},
    peasants: function(){ return {name: 'peasant', health: 2, attack: 1}},
    gMasters: function(){ return {name: 'Grand Master', health: 5, attack: 4}},
    wolves: function(){ return {name: 'Wolf', health: 1, attack: 1, bounty: ['wolves',1]}}
  }
  this.hitAbove = 11;
  this.combatHistory = [];
  this.playerArray = [];
  this.opponentArray = [];
  this.playerLoaded = false;
}

CombatController.prototype.init = function(){

  this.bounty = window.gameState.gameController.getBountyForMap();
  this.playerArmy = window.gameState.gameController.getPlayerArmy();

  window.gameState.gameController.views['explore'].state = 'An encounter!';
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
    if(roll > self.hitAbove) {
      enemyUnit.health -= playerUnit.attack;
      self.combatHistory.push('player');
      if(enemyUnit.health <= 0){
        self.opponentArray.splice(enemyIndex, 1);
        if(enemyUnit.bounty){
          var prize = enemyUnit.bounty;
          self.bounty[prize[0]] += prize[1];
        }
        window.gameState.gameController.message('Your '+playerUnit.name+' killed a '+enemyUnit.name+'.', 'red');
      } else {
        window.gameState.gameController.message('Your '+playerUnit.name+' did '+playerUnit.attack+' damage to a '+enemyUnit.name+'.', 'red')
      }
    } else {
      playerUnit.health -= enemyUnit.attack;
      self.combatHistory.push('enemy');
      if(playerUnit.health <= 0){
        self.playerArray.splice(playerIndex, 1);
        window.gameState.gameController.message('Your '+playerUnit.name+' was killed by a '+enemyUnit.name+'.', 'red')
      } else {
        window.gameState.gameController.message('Your '+playerUnit.name+' recieved '+enemyUnit.attack+' damage from a '+enemyUnit.name+'.', 'red')
      }
    }
    if(self.playerArray.length === 0){
      window.gameState.gameController.message('You return home defeated.');
      window.gameState.gameController.controllers.map.changeState("exploring");
      window.gameState.gameController.controllers.map.goHome();
    } 
    else if(self.opponentArray.length === 0) {
      $('.units').empty();
      $('.units').append(window.gameState.gameController.views['explore'].render());
      window.gameState.gameController.controllers.map.changeState("exploring");
      window.gameState.gameController.message(window.gameState.gameController.views.map.winMessage, "blue");
    } else {
      self.render();
      self.fight();
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
        window.gameState.gameController.message('Your '+playerUnit.name+' was killed by a '+enemyUnit.name+'.', 'red');
      } else {
        window.gameState.gameController.message('Your '+playerUnit.name+' recieved '+enemyUnit.attack+' damage from a '+enemyUnit.name+'.', 'red');
      }
      self.opponentArray = [];
      if(self.playerArray.length === 0){
      window.gameState.gameController.message('You return home defeated.');
      window.gameState.gameController.controllers.map.changeState("exploring");
      window.gameState.gameController.controllers.map.goHome();
      } else {
        window.gameState.gameController.message("Just barely escaped!")
        $('.units').empty()
        window.gameState.gameController.controllers['map'].state = "exploring";
        $('.units').append(window.gameState.gameController.views['explore'].render());
      }
  })

}

CombatController.prototype.makeCombatArray = function(){
  var unit, number;
  var types = this.unitTypes;
  var opponents = this.opponentArray
  forEach(this.opponentArmy, function(unitData){
    for(var i = 0; i < unitData[1]; i++){
      unit = types[unitData[0]]();
      opponents.push(unit);
    }
  })
  if(!this.playerLoaded){
    this.playerLoaded = true;
    for(var type in this.playerArmy){
      number = this.playerArmy[type];
      for(var i = 0; i < number; i++){
        unit = this.unitTypes[type]();
        this.playerArray.push(unit);
      }
    }
  }
}

CombatController.prototype.getEnemies = function(){
  this.opponentArmy = window.gameState.gameController.views['map'].getEnemies();
  this.makeCombatArray();
}

CombatController.prototype.checkHistory = function(value){
  if(this.combatHistory.length > 3){
    var recent3 = this.combatHistory.splice(this.combatHistory.length-3, this.combatHistory.length);
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