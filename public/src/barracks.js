var Barracks = function(){
  System.call(this);
  this.knights = 4;
  this.horses = 2;
  this.gMasters = 0;
}

Barracks.prototype = Object.create(System.prototype);

Barracks.prototype.step = function(){
  if(window.gameState.stage % 12 === 0){
    this.knights += 1;
  }
}

Barracks.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box barracks');
  $(template.children()[0]).text('BARRACKS');
  template.append('<p> Knights:     '+this.knights+'</p>');
  template.append('<p> Level:    '+this.level+'</p>');
  template.append('<p> Horses:  '+this.horses+'</p>');
  if(this.gMasters){
    template.append('<p> Grand Masters:  '+this.gMasters+'</p>');
  }
  return template;
}