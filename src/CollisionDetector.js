define(['src/DB'],function(DB){

//**********************PRIVATE METHODS****************************//

  var collision_with_other_elements = function(point){
    DB.elements.forEach(function(element){
      if( element.position[0] === point[0] && element.position[1] === point[1] ){
        return true;
      };
    };
  },
  allowedToMove : function(point){
    if(this.grid.outside(point) || collision_with_other_elements(point) ){
      return false;
    }
  }


//**********************MAIN OBJECTS****************************//


  var CollisionDetector = {


  }



  return CollisionDetecor;

});
