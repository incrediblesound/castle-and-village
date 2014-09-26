var populateActions = function(){
  actions.forEach(function(action){
    if(castle.money > action.cost){
    $('.'+action.type).append('<button class="action">'+action.action+'</button><span> '+action.cost+' Gold</span><br>')
    } else {
    $('.'+action.type).append('<button disabled="true">'+action.action+' Not enough Gold</button><br>')
    }
  })
}

var actions = [
{action:'Hold a Festival', type: 'actions', cost: 25},
{action:'Clear a Field', type: 'actions', cost: 15},
{action:'Buy a War Horse', type: 'purchase', cost: 20},
{action:'Hire a Blacksmith', type: 'purchase', cost: 10},
{action:'Collect Taxes', type: 'actions', cost: 0},
{action:'Plant a Vineyard', type: 'actions', cost: 30}
];

var actionMap = {
  'Hold a Festival': function(){
    village.festival();
    castle.money -= 25;
  },
  'Clear a Field': function(){
    domain.makeField();
    castle.money -= 15;
  },
  'Buy a War Horse': function(){
    barracks.horses += 1;
    castle.money -= 20;
  },
  'Hire a Blacksmith': function(){
    castle.masters.push('Blacksmith');
    castle.money -= 10;
  },
  'Collect Taxes': function(){
    village.deliverTaxes();
  },
  'Plant a Vineyard': function(){
    domain.makeVineyard();
    castle.money -= 30
  }
}

//disasters are randomly selected (level 2) according to player level (level 1)