var populateActions = function(){
  actions.forEach(function(action){
    if(window.game.castle.money > action.cost){
    $('.buttons').append('<button class="action">'+action.action+'</button>')
    } else {
    $('.buttons').append('<button disabled="true"'+action.action+'</button>')
    }
  })
}

var actions = [
{action:'Hold a Festival', cost: 25},
{action:'Clear a Field', cost: 15},
{action:'Buy a War Horse', cost: 20},
{action:'Hire a Blacksmith', cost: 10}
];

var actionMap = {
  'Hold a Festival': function(){
    window.game.village.festival();
    window.game.castle.money -= 25;
  },
  'Clear a Field': function(){
    window.game.domain.makeField();
    window.game.castle.money -= 15;
  },
  'Buy a War Horse': function(){
    window.game.barracks.horses += 1;
  }
}