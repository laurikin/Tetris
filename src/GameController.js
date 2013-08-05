define(['src/Timer','src/DB','src/Block','src/Renderer','src/Destroyer','src/Listeners'],function(Timer,DB,Block,Renderer,Destroyer,Listeners){

  var gameOver = function(callBack) {
    if(DB.block.collision(0,1)){
      var elements = DB.elements.concat(DB.block.elements);
      return elements.some(function(element){
        return ( element.position[1] === 0 ? true : false )
      });
    }else{
      return false;
    }
  };

  var newBlock = function(callBack){
    if(DB.block.collision(0,1)){
      return true;
    }else{
      return false;
    }
  }


  var createTimer = function(loop){
    return new Timer({
        fps: 2,
        run: loop.bind(this)
      });
  }

  var GameController = {

    mainLoop: function(){

      var $this = this;

      if (gameOver()){
        $this.stop();
        console.log('Game over!');
      }else if (newBlock()){

        console.log('NewBlock');

        DB.block.elements.forEach(function(element){
          DB.elements.push(element);
        });

        var destroyableRows = Destroyer.destroyRows();

        if(destroyableRows.length > 0){
          $this.gameTimer.increaseSpeed(Math.floor(DB.counter.score/100) + 2);
        }

        DB.counter.increment(destroyableRows.length);
        $("#score").html(DB.counter.score);

        DB.block = new Block({
          center: [4,0],
          type: DB.nextBlock.type
        });

        console.log( DB.block.type )
        console.log( DB.nextBlock.type )

        DB.nextBlock.elements.forEach(function(element){
          $(element.node).remove();
        });

        DB.nextBlock = new Block({
          center: [2,1]
        });
        Renderer.renderNextBlock(DB.grid);

      }else{
        DB.block.moveDown();
      }
    },
    gameTimer: 0,
    prepare: function(){
      DB.counter.restart();
      $("#score").html(DB.counter.score);
      DB.deleteAll();
      Renderer.clear();
      Renderer.renderGrid(DB.grid);
      DB.block = new Block({
        center: [4,0] });
      DB.nextBlock = new Block({
        center: [2,1] });

      Renderer.renderNextBlock();

      this.renderingInterval = setInterval(function(){
        Renderer.render()
      },30);

      this.gameTimer = createTimer.call(this,this.mainLoop);

    },
    start: function(){
      console.log('start');
      this.gameTimer.start();
      Listeners.createGameKeys();
    },
    stop: function(){
      this.gameTimer.stop();
      clearInterval(this.renderingInterval);
      Listeners.destroyGameKeys();
      $('#start-screen').fadeIn();
    }

  }



  return GameController;

});
