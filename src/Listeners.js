define(['src/DB', 'src/GameController'],function(DB,GameController){

  var gameKeys = function(e){
    switch(e.keyCode){
      case 37:
        // left arrow   37
        DB.block.moveLeft();
        console.log('moveLeft');
        break;
      case 38:
        // up arrow   38
        DB.block.rotate();
        break;
      case 39:
        // right arrow  39
        DB.block.moveRight();
        break;
      case 40:
        // down arrow   40
        DB.block.moveDown();
        break;
    }
  }

  var Listeners = {

    createGameKeys: function(){
      $(document).on('keydown.game', gameKeys );
    },
    destroyGameKeys: function(){
      $(document).off('keydown.game');
    }
  }

  return Listeners;

});
