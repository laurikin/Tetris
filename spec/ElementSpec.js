define(['src/Element'],function(Element){


  describe("Element", function() {

    var element;

    beforeEach(function() {
      element = new Element({
        color: '#f00',
        position: [3,4]
      });
    });


    it("exists", function() {
      expect(element.toString()).toBe('object Element');
      console.log(element);
    });

    it("has color", function() {
      expect(element.color()).toBe('#f00');
    });

    it("has position", function() {
      expect(element.position()).toEqual([3,4])
    });

    it("moves down", function() {
      element.moveDown();
      expect(element.position()).toEqual([3,5]);
    });

    it("moves right", function() {
      element.moveRight();
      expect(element.position()).toEqual([4,4]);
    });

    it("moves left", function() {
      element.moveLeft();
      expect(element.position()).toEqual([2,4]);
    });


  });


});
