var ActionController = function(){
  System.call(this);

  this.actionMap = {
    'Hire a Master Baker': function(){
      window.gameState.units.village.addMaster('Baker');
    },
    'Build a Church': function(){
      window.gameState.units.village.addBuilding('Church');
      window.gameState.units.village.energy += 1;
    },
    'Hold a Festival': function(){
      window.gameState.units.village.festival();
      window.gameState.units.castle.money -= 25;
    },
    'Clear a Field': function(){
      window.gameState.units.domain.makeField();
      window.gameState.units.castle.money -= 15;
    },
    'Buy a War Horse': function(){
      window.gameState.units.barracks.horses += 1;
      window.gameState.units.castle.money -= 20;
    },
    'Hire a Blacksmith': function(){
      window.gameState.units.castle.masters.push('Blacksmith');
      window.gameState.units.castle.money -= 10;
    },
    'Collect Taxes': function(){
      window.gameState.units.village.deliverTaxes();
    },
    'Plant a Vineyard': function(){
      window.gameState.units.domain.makeVineyard();
      window.gameState.units.castle.money -= 30
    }
}

  this.actions = [
    {action:'Hold a Festival', type: 'actions', cost: 25},
    {action:'Clear a Field', type: 'actions', cost: 15},
    {action:'Hire a Blacksmith', type: 'purchase', cost: 20},
    {action:'Hire a Swordsman', type: 'purchase', cost: 30},
    {action:'Build a Granary', type: 'purchase', cost: 20},
    {action:'Hire a Master Baker', type: 'purchase', cost: 10},
    {action:'Collect Taxes', type: 'actions', cost: 0},
    {action:'Plant a Vineyard', type: 'actions', cost: 30},
    {action:'Build a Church', type: 'purchase', cost: 30}
  ];
}

ActionController.prototype = Object.create(System.prototype);

ActionController.prototype.doAction = function(value){
  return this.actionMap[value]();
}

ActionController.prototype.step = function(){
  $('.actions').empty();
  $('.purchase').empty();
  this.actions.forEach(function(action){
    if(window.gameState.units.castle.money > action.cost){
    $('.'+action.type).append('<button class="action">'+action.action+'</button><span> '+action.cost+' Gold</span><br>')
    } else {
    $('.'+action.type).append('<button disabled="true">'+action.action+'</button><span>Not enough Gold</span><br>')
    }
  })
}