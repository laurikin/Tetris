define(['src/DB'],function(DB){

//**********************PRIVATE METHODS****************************//

  var collision_with_other_elements = function(point) {
    DB.elements.forEach(function(element){
      if( element.position[0] === point[0] && element.position[1] === point[1] ){
        return true;
      };
    });
  }



//**********************MAIN OBJECTS****************************//


  return {
    allowedToMove: function(point){
      if(DB.grid.isOutside(point) || collision_with_other_elements(point) ){
      return false;
      }
    }
  }

});
