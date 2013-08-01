define(['src/Timer'],function(Timer){

  beforeEach(function() {
    var settings = {
      run: function(){
        return 'hello';
      }
    };
    timer = new Timer(settings)
  });

  describe("Timer", function() {
    it("exists", function() {
      expect(Timer).toBeDefined();
    });
  });

  describe("start", function() {
    it("exists", function() {
      expect(timer.start).toBeDefined();
    });
  });

});
