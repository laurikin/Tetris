define(['src/Counter'],function(Counter){

  var counter;

  beforeEach(function() {
    counter = new Counter();
  });

  describe("Counter", function() {

    it("exists", function() {
      console.log(counter);
      expect(counter instanceof Counter).toBeTruthy();
    });

    it("keeps score", function() {
      expect(counter.score).toEqual(0);
    });

    it("increments score", function() {
      counter.increment(4);
      expect(counter.score).toEqual(160);
    });

    it("can be restarted", function() {
      counter.increment(4);
      counter.restart();
      expect(counter.score).toEqual(0);
    });
  });


});
