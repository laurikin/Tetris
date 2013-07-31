define(function(){

  var CounterProto = {
        toString: function(){return "object Counter"}
      }


  return function(){

    var score = 0;

    var Counter = Object.create(CounterProto);
    Counter.score = function(){
      return score;
    };
    Counter.increment = function(x){
      score += Math.pow(x, 2)*10;
    }
    Counter.restart = function(){
      score = 0;
    }

    return Counter;
  }

});
