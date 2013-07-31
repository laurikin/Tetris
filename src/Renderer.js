define(['src/Set','src/config'],function(Set,config){

  return (function(){

    var divs = [];

    var setCss = function(el,element){
      $(el).css({
        width: config.cellSize,
        height: config.cellSize,
        "background-color": "#f00",
        "z-index": 1000,
        position: "absolute",
        top: element.position()[1]*config.cellSize,
        left: element.position()[0]*config.cellSize
      });
    }

    var clearScreen = function(){
      for (var i = divs.length - 1; i >= 0; i--) {
        $(divs[i]).remove();
      };
    }

    var Renderer = {
      render: function(){
        clearScreen();
        var elements = Set.elements;
        for (var i = elements.length - 1; i >= 0; i--) {
          var el = document.createElement("div")
          setCss(el,elements[i]);
          $(config.container).append(el);
          divs.push(el);
        };
      }
    }

    return Renderer;

  }());

});
