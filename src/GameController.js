define(['src/Timer'],function(Timer){

  return function(){

    var loop = {
      run: function(){

      }
    }

    var GameController = {

    toString: function(){return "object GameController"},

    start: function(){
      var timer = new Timer(loop)
    }

    }



    return GameController;
  }

});
