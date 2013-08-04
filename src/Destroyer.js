define(['src/DB'],function(DB) {

  var Destroyer = {

    destroyRow: function(row){
      for (var i = DB.elements.length - 1; i >= 0; i--) {
        if(DB.elements[i].position[1] === row){
          var node = $(DB.elements[i].node);
          node.fadeOut(400,function(){
            node.remove();
          });
          DB.elements.splice(i,1);
          delete element;
        }
      }
    },
    moveRowDown: function(row){
      DB.elements.forEach(function(element){
        if(element.position[1] < row){
          element.moveDown();
        }
      });
    },
    destroyableRows: function(){
      var destroyableRows = [];
      for (var row = DB.grid.rows - 1; row >= 0; row--) {
        var count = 0;
        DB.elements.forEach(function(element){
          if (element.position[1] === row) {
            count += 1;
          }
        });
        if(count >= DB.grid.columns){
          destroyableRows.push(row);
        }
      }
      return destroyableRows;
    },
    destroyRows: function(){

      var destroyableRows = this.destroyableRows();

      destroyableRows.forEach(function(row){
        this.destroyRow(row);
      },this);

      for (var i = destroyableRows.length - 1; i >= 0; i--) {
        this.moveRowDown(destroyableRows[i]);
      };

      return destroyableRows;
    }
  }
  return Destroyer;
});
