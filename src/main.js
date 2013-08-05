require.config({
  baseUrl: "./"
});

require(['src/tetrisConfig','src/Grid','src/DB','src/Renderer','src/Counter','src/GameController'],function(config,Grid,DB,Renderer,Counter,GameController){

  DB.grid = new Grid({
    cellSize: config.cellSize,
    columns: 8,
    rows: 18
  });

  var grid = DB.grid;

  DB.counter = new Counter();

  Renderer.renderGrid(grid);

  $(document).on('keydown', function(e){
    if(e.keyCode === 32 && $('#start-screen').css('display') !== 'none'){
      GameController.prepare();
      GameController.start();
    }
  });

});

