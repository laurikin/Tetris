define(['src/DB'],function(DB){

//**********************PRIVATE METHODS****************************//

  var collision_with_other_elements = function(point) {
    var collision = false;
    DB.elements.forEach(function(element){
      if( element.position[0] === point[0] && element.position[1] === point[1] ){
        collision = true;
      };
    });
    return collision;
  }



//**********************MAIN OBJECTS****************************//


  return {
    allowedToMove: function(point){
      if( DB.grid.isOutside(point) || collision_with_other_elements(point) ){
        return false;
      }else{
        return true;
      }
    }
  }

});
