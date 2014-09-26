var Castle = function(){
  System.call(this);
  this.money = 100;
  this.wizards = 0;
  this.level = 1;
  this.masters = ['swordsman'];
  this.buildings = ['granary'];
  this.food = 40;
}

Castle.prototype = Object.create(System.prototype);
Castle.prototype.contructor = Castle;

Castle.prototype.hasMaster = function(value){
  return (this.masters.indexOf(value) !== -1)
}

Castle.prototype.hasBuilding = function(value){
  return (this.buildings.indexOf(value) !== -1)
}

Castle.prototype.step = function(){
  this.food -= barracks.knights;
}

Castle.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box castle');
  $(template.children()[0]).text('CASTLE');
  template.append('<p> Money:       '+this.money+'</p>');
  template.append('<p> Food:       '+this.food+'</p>');
  template.append('<p> Level:       '+this.level+'</p>');
  return template;
}