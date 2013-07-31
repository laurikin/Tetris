define(['src/Grid', 'src/config'],function(Grid,config){

  var collision_with_other_elements = function(point,elements){
    var length = elements.length
    for (var i = length - 1; i >= 0; i--) {
      if( elements[i].position()[0] === point[0] && elements[i].position()[1] === point[1] ){
        return true;
      };
    };
  };

  return {
    elements: [],
    block: 0,
    grid: new Grid(8,18,config.cellSize),
    allowedToMove : function(point){
      if(this.grid.outside(point) || collision_with_other_elements(point,this.elements) ){
        return false;
      }
    }
  }

});
