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
    start: function(){
      timer.start();
    },
    stop: function(){
      timer.stop();
    }
  }
  return Destroyer;
});
