define(['src/DB','src/config'],function(DB,config){

  return (function(){

    var elements = [];

    var setCss = function(el,element){
      $(el).css({
        width: config.cellSize - 1,
        height: config.cellSize - 1,
        "background-color": "#f00",
        border: "solid 1px white",
        "z-index": 1000,
        position: "absolute",
        top: element.position[1]*config.cellSize,
        left: element.position[0]*config.cellSize
      });
    }

    var Renderer = {
      render: function(){
        var elements = DB.elements.concat(DB.block.elements);
        for (var i = elements.length - 1; i >= 0; i--) {
          if( typeof elements[i].node === 'undefined' ){
            elements[i].node = (function(){
              var div = document.createElement('div');
              setCss(div,elements[i]);
              $(config.container).append(div);
              return div;
            }());
          }
          setCss(elements[i].node,elements[i]);
        };
      },
      renderNextBlock: function(){
        var elements = DB.nextBlock.elements;
        for (var i = elements.length - 1; i >= 0; i--) {
          elements[i].node = (function(){
              var div = document.createElement('div');
              setCss(div,elements[i]);
              $('#next-block').append(div);
              return div;
          }());
        }
      }
    }

    return Renderer;

  }());

});
