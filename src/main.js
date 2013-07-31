require.config({
          baseUrl: "./"
        });

require(['src/config','src/Grid','src/Block','src/Set','src/Renderer'],function(config,Grid,Block,set,Renderer){
  var grid = set.grid
  var destroyRow = function(row){
    for (var i = set.elements.length - 1; i >= 0; i--) {
      if(set.elements[i].position()[1] === row){
        var node = $(set.elements[i].node);
        var el = set.elements.splice(i,1);
        delete el;
        node.fadeOut(400,function(){
          node.remove();
        });
      }
    };
  };
  var moveRowDown = function(row){
    for (var i = set.elements.length - 1; i >= 0; i--) {
      if(set.elements[i].position()[1] < row){
        set.elements[i].moveDown();
      }
    };
  };

  set.block = new Block({
    type: Math.floor((Math.random()*7)+1),
    center: [4,0] });

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

  var rendering_interval = setInterval(function(){
    Renderer.render()
  },30);

  var game_interval = setInterval(function(){
    console.log('Gaming!');
    if(set.block.moveDown() === false){
      for (var i = set.block.elements().length - 1; i >= 0; i--) {
        if(set.block.elements()[i].position()[1] === 0){
          window.clearInterval(game_interval);
          window.clearInterval(rendering_interval);
          alert('Game Over!');
        }
      };
      for (var i = set.block.elements().length - 1; i >= 0; i--) {
        set.elements.push(set.block.elements()[i]);
      };
      var destroyable_rows = []
      for (var row = set.grid.rows - 1; row >= 0; row--) {
        var count = 0;
        for (var j = set.elements.length - 1; j >= 0; j--) {
          if (set.elements[j].position()[1] === row) {
            count += 1;
          }
        };
        if(count >= set.grid.columns){
          console.log('if_count > columns');
          destroyable_rows.push(row);
        }
      };
      console.log(destroyable_rows);
      for (var k = destroyable_rows.length - 1; k >= 0; k--) {
        destroyRow(destroyable_rows[k]);
      };
      for (var l = destroyable_rows.length - 1; l >= 0; l--) {
        moveRowDown(destroyable_rows[l]);
      };

      set.counter.increment(destroyable_rows.length);
      $("#score").html(set.counter.score());

      set.block = new Block({
        type: Math.floor((Math.random()*7)+1),
        center: [4,0]
      });
    }
  },500);

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

