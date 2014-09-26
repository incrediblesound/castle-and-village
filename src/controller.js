var Controller = function(){
  System.call(this);
}

Controller.prototype = Object.create(System.prototype);
Controller.prototype.constructor = Controller;

Controller.prototype.init = function(){
  this.on('step', function(){
    castle.step();
    domain.step();
    barracks.step();
    village.step();
    milestones.step();
    actionController.step();
    $('.units').append(castle.render());
    $('.units').append(domain.render());
    $('.units').append(barracks.render());
    $('.units').append(village.render());
  })
  this.on('render', function(){
    $('.units').append(castle.render());
    $('.units').append(domain.render());
    $('.units').append(barracks.render());
    $('.units').append(village.render());
  })
}