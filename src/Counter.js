define(function(){

  var Counter = function(){

    this.__score = 0;

  }

  Counter.prototype = {
    increment: function(num) {
      this.__score += Math.pow(num, 2)*10;
    },
    restart: function() {
      this.__score = 0;
    }
  }

  Object.defineProperties(Counter.prototype,{
    score:{
      get: function(){ return this.__score; }
    }
  });

  return Counter;

});
