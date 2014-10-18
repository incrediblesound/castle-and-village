var CatacombsMap = function(){

  this.name = 'Catacombs'

  this.playerLocation = new Location(352, 95)
  this.objects = {
    fill: [[260,160],[240,160],[220,160]],
  }
  this.state = "You enter the dark catacombs..."
  
};

CatacombsMap.prototype.render = function(){
}