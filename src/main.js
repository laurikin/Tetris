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

  (function renderGrid() {
    for (var i = grid.cells.length - 1; i >= 0; i--) {
      var cell = grid.cells[i];
      var celldiv = document.createElement("div");
      $(celldiv).css({
        width: cell.size,
        height: cell.size,
        'background-color': '#000',
        position: "absolute",
        border: "solid 1px grey",
        top: cell.y,
        left: cell.x
      });
      $('#tetris-container').append(celldiv);
    };
  }());

  var rendering_interval = setInterval(function(){
    Renderer.render()
  },30);

  GameController.start();

  $(document).on('keydown',function(e){
    switch(e.keyCode){
      case 37:
        // left arrow   37
        DB.block.moveLeft();
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
  });


});

