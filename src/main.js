require.config({
          baseUrl: "./"
        });

require(['src/config','src/Grid','src/Block','src/DB','src/Renderer','src/GameController','src/Counter'],function(config,Grid,Block,DB,Renderer,GameController,Counter){

  DB.grid = new Grid({
    cellSize: config.cellSize,
    columns: 8,
    rows: 18
  });
  var grid = DB.grid;

  DB.counter = new Counter();


  DB.block = new Block({
    type: Math.floor((Math.random()*7)+1),
    center: [4,0] });

  DB.nextBlock = new Block({
    type: Math.floor((Math.random()*7)+1),
    center: [2,1] });

  Renderer.renderNextBlock();

  var rendering_interval = setInterval(function(){
    Renderer.render()
  },30);

  Renderer.renderGrid(grid);

  GameController.start();

});

