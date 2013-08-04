define(['src/Timer','src/DB','src/Block','src/Renderer'],function(Timer,DB,Block,Renderer){

  var destroyRow = function(row){
    for (var i = DB.elements.length - 1; i >= 0; i--) {
      if(DB.elements[i].position[1] === row){
        var node = $(DB.elements[i].node);
        node.fadeOut(400,function(){
          node.remove();
        });
        DB.elements.splice(i,1);
        delete element;
      }
    }
  };

  var moveRowDown = function(row){
    DB.elements.forEach(function(element){
      if(element.position[1] < row){
        element.moveDown();
      }
    });
  };


  var loop = {
    fps: 2,
    run: function(){
      if(DB.block.moveDown() === false){

      DB.elements.forEach(function(element){
        if(element.position[1] === 0){
          GameController.stop();
          console.log('Game Over!');
        }
      });

      DB.block.elements.forEach(function(element){
        DB.elements.push(element);
      });

      var destroyable_rows = [];

      for (var row = DB.grid.rows - 1; row >= 0; row--) {
        var count = 0;
        DB.elements.forEach(function(element){
          if (element.position[1] === row) {
            count += 1;
          }
        });
        if(count >= DB.grid.columns){
          destroyable_rows.push(row);
        }
      };

      destroyable_rows.forEach(function(row){
        destroyRow(row);
      });

      if(destroyable_rows.length > 0){
        timer.increaseSpeed(Math.floor(DB.counter.score/100) + 2);
      }

      for (var i = destroyable_rows.length - 1; i >= 0; i--) {
        moveRowDown(destroyable_rows[i]);
      };

      DB.counter.increment(destroyable_rows.length);
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
  };

  var timer = new Timer(loop);

  var GameController = {

    prepare: function(){

    },
    start: function(){
      timer.start();
    },
    stop: function(){
      timer.stop();
    },

  }



  return GameController;

});
