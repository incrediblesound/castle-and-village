var Domain = function(){
  System.call(this);
  this.fields = 5;
  this.forests = 7;
  this.mountains = 3;
  this.lakes = 2;
  this.vineyards = 0;
  this.mines = 0;
}

Domain.prototype = Object.create(System.prototype);
Domain.prototype.constructor = Domain;

Domain.prototype.step = function(){

}

Domain.prototype.makeField = function(){
  if(this.forests > 0){
    this.fields += 1;
    this.forests -= 1;
  }
}

Domain.prototype.makeVineyard = function(){
  if(this.fields > 2){
    this.fields -= 1;
    this.vineyards += 1;
  }
}

Domain.prototype.makeMine = function(){
  if(this.mountains > 0){
    this.mountains -= 1;
    this.mines += 1;
  }
}

Domain.prototype.render = function(){
  var template = $('.template').clone();
  template.removeClass('template');
  template.addClass('box domain');
  $(template.children()[0]).text('DOMAIN');
  template.append('<p> Fields:     '+this.fields+'</p>');
  template.append('<p> Forests:    '+this.forests+'</p>');
  template.append('<p> Vineyards:  '+this.vineyards+'</p>');
  template.append('<p> Mines:      '+this.mines+'</p>');
  return template;
}