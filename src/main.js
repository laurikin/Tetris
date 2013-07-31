require.config({
          baseUrl: "./"
        });

require(['src/config','src/Grid','src/Block','src/Set','src/Renderer'],function(config,Grid,Block,set,Renderer){
  var grid = new Grid(8,20,config.cellSize);
  var block = new Block({
    type: 2,
    center: [4,0] });

  set.block = block;

  (function renderGrid() {
    for (var i = grid.cells().length - 1; i >= 0; i--) {
      var cell = grid.cells()[i];
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

  setInterval(function(){
    Renderer.render()
  },30);

  setInterval(function(){
    set.block.moveDown();
    console.log(set.block.center());
  },1000);

  $(document).on('keydown',function(e){
    switch(e.keyCode){
      case 37:
        // left arrow   37
        set.block.moveLeft();
        break;
      case 38:
        // up arrow   38
        set.block.rotate();
        break;
      case 39:
        // right arrow  39
        set.block.moveRight();
        break;
      case 40:
        // down arrow   40
        set.block.moveDown();
        break;
    }
  });

});

