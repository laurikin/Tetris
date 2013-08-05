define(['src/Timer','src/DB','src/Block','src/Renderer','src/Destroyer','src/Listeners'],function(Timer,DB,Block,Renderer,Destroyer,Listeners){

  var onGameOver = function(callBack) {
    if(DB.block.collision(0,1)){
      DB.elements.forEach(function(element){
        if(element.position[1] === 0){
          callBack();
        }
      });
    }
  };

  var onNewBlock = function(callBack){
    if(DB.block.collision(0,1)){
      callBack();
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

      onGameOver.call(this, function(){
        $this.stop();
        console.log('Game over!')
      });

      onNewBlock.call(this,function(){


        console.log('NewBlock')

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

        DB.nextBlock.elements.forEach(function(element){
          $(element.node).remove();
        });

        DB.nextBlock = new Block({
          center: [2,1]
        });

        Renderer.renderNextBlock(DB.grid);

      });

      DB.block.moveDown();
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
