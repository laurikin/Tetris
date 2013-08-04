define(['src/Cell'],function(Cell){


//*********************PRIVATE METHODS**********************//

  var createCells = function(){
    var cols = [];
    for (var i = this.columns - 1; i >= 0; i--) {
      var row = [];
      cols[i] = row
      for (var j = this.rows - 1; j >= 0; j--) {
        var cell = new Cell({
          size: this.cellSize,
          x: i*this.cellSize,
          y: j*this.cellSize
        });
        this.cells.push(cell);
        row[j] = cell;
      };
    };
    return cols;
  }

//******************MAIN OBJECT+++++++++++++++++++++++//

  var Grid = function(opts){

    this.attrs = (function(){
      var o = ( opts ? opts : {} );
      return {
        rows: o.rows || 36,
        columns: o.columns || 12,
        cellSize: o.cellSize || 30
      }
    }());

    this.cells = [];
    this.matrix = createCells.call(this);

  }

  Grid.prototype = {
    isOutside:   function(point){
      if(point[0] >= this.columns || point[0] < 0 || point[1] >= this.rows || point[1] < 0 ){
        return true;
      }else{
        return false;
      }
    },
    cell: function(column,row){
      return this.matrix[column][row];
    }
  }

  Object.defineProperties(Grid.prototype,{
    rows: {
      get: function(){ return this.attrs.rows; }
    },
    columns: {
      get: function(){ return this.attrs.columns; }
    },
    cellSize: {
      get: function(){ return this.attrs.cellSize; }
    }
  })

  return Grid;

});
