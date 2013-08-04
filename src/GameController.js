define(['src/Timer','src/DB','src/Block','src/Renderer','src/Destroyer','src/Listeners'],function(Timer,DB,Block,Renderer,Destroyer,Listeners){

  var gameOver = function(callBack){
    DB.elements.forEach(function(element){
      if(element.position[1] === 0){
        callBack();
      }
    });
  }

  var loop = function(){
      if(DB.block.moveDown() === false){

      gameOver(function(){
        GameController.stop();
        console.log('Game Over!');
      });

      DB.block.elements.forEach(function(element){
        DB.elements.push(element);
      });

      var destroyableRows = Destroyer.destroyRows();

      if(destroyableRows.length > 0){
        timer.increaseSpeed(Math.floor(DB.counter.score/100) + 2);
      }

      DB.counter.increment(destroyableRows.length);
      $("#score").html(DB.counter.score);

      DB.block = new Block({
        center: [4,0],
        type: DB.nextBlock.type
      });

      DB.nextBlock.elements.forEach(function(element){
        $(element.node).remove();
      });

      DB.nextBlock = new Block({
        type: Math.floor((Math.random()*7)+1),
        center: [2,1]
      });

      Renderer.renderNextBlock();
      }

  }

  var timer = new Timer({
    fps: 2,
    run: loop
    });

  var GameController = {

    prepare: function(){

    },
    start: function(){
      console.log('start');
      timer.start();
      Listeners.createGameKeys();
    },
    stop: function(){
      timer.stop();
      Listeners.destroyGameKeys();
      $('#start-screen').fadeIn();
    }

  }



  return GameController;

});
