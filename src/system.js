var System = function(interval){
  this.events = {};
  this.$node = $('<span class="system"></span>');
}

System.prototype.on = function(event, callback){
  this.events[event] = this.events[event] || [];
  this.events[event].push(callback);
}

System.prototype.trigger = function(event, data) {
    var i;
    var l_ = this.events[event].length;
    for(i = 0; i < l_; i++) {
      this.events[event][i](data);
    }
  }

System.prototype.step = function(){
  
}