define(['src/Cell'],function(Cell){

  var GridProto = {
    toString: function(){return "object Grid"}
  };

  return function(columns, rows, cellSize){

    var rows = typeof rows !== 'undefined' ? rows : 36,
      columns = typeof columns !== 'undefined' ? columns : 12,
      cellSize = typeof cellSize !== 'undefined' ? cellSize : 30,
      cells = [],
      matrix = (function(){
      var cols = [];
      for (var i = columns - 1; i >= 0; i--) {
        var row = [];
        cols[i] = row
        for (var j = rows - 1; j >= 0; j--) {
          var cell = Object.create(Cell({
            size: cellSize,
            x: i*cellSize,
            y: j*cellSize
          }));
          row[j] = cell;
          cells.push(cell);
        };
      };
      return cols;
    }());

    var Grid = Object.create(GridProto)

    Grid.rows = rows;
    Grid.columns = columns;
    Grid.cell = function(c,r){
      return matrix[c][r]
    }
    Grid.cells = function(){
      return cells;
    }
    Grid.cellSize = function(){
      return cellSize;
    }
    Grid.outside = function(point){
      if(point[0] >= Grid.columns || point[0] < 0 || point[1] >= Grid.rows || point[1] < 0 ){
        return true;
      }else{
        return false;
      }
    }

    return Grid
  }
});
