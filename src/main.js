require.config({
  baseUrl: "./"
});

require(['src/tetrisConfig','src/Grid','src/Block','src/DB','src/Renderer','src/GameController','src/Counter'],function(config,Grid,Block,DB,Renderer,GameController,Counter){

  DB.grid = new Grid({
    cellSize: config.cellSize,
    columns: 8,
    rows: 18
  });

  var grid = DB.grid;

  DB.counter = new Counter();

  Renderer.renderGrid(grid);

  $(document).on('keydown.startscreen',function(e){
    if(e.keyCode === 32){
      if($('#start-screen').css('display') !== 'hidden'){
        GameController.prepare();
        GameController.start();
        $('#start-screen').fadeOut();
      }
    }
  });

});

