define(['src/Block'],function(Block){

  //blocktype 2: [[-1,1],[0,1],[1,1],[1,0]]

  describe("Block", function() {

    var block;

    beforeEach(function() {
      block = new Block({
        type: 2,
        center: [0,0]
      });
    });

    it("exists", function() {
      expect(block.toString()).toBe('object Block');
      console.log(block);
    });

    it("has type", function() {
      expect(block.type()).toBe(2)
    });

    it("has schema", function() {
      var schema = [[-1,1],[0,1],[1,1],[1,0]]
      expect(block.schema()).toEqual(schema);
    });

    it("has center", function() {
      expect(block.center()).toEqual([0,0]);
    });

    it("has elements", function() {
      expect(block.elements()[2].toString()).toEqual('object Element')
      expect(block.elements()[0].position()).toEqual([-1,1]);
    });

    it("moves down", function() {
      block.moveDown();
      expect(block.elements()[0].position()).toEqual([-1,2]);
      expect(block.elements()[1].position()).toEqual([0,2]);
      expect(block.elements()[2].position()).toEqual([1,2]);
      expect(block.elements()[3].position()).toEqual([1,1]);
    });

    describe("if space", function() {

      it("moves left", function() {
        block.moveLeft();
        expect(block.elements()[0].position()).toEqual([-2,1]);
        expect(block.elements()[1].position()).toEqual([-1,1]);
        expect(block.elements()[2].position()).toEqual([0,1]);
        expect(block.elements()[3].position()).toEqual([0,0]);
      });

    });

    it("moves right", function() {
      block.moveRight();
      expect(block.elements()[0].position()).toEqual([0,1]);
      expect(block.elements()[1].position()).toEqual([1,1]);
      expect(block.elements()[2].position()).toEqual([2,1]);
      expect(block.elements()[3].position()).toEqual([2,0]);
    });

    it("rotates", function() {
      //blocktype 2: [[-1,1],[0,1],[1,1],[1,0]]
      block.rotate();
      expect(block.elements()[0].position()).toEqual([1,1]);
      expect(block.elements()[1].position()).toEqual([1,0]);
      expect(block.elements()[2].position()).toEqual([1,-1]);
      expect(block.elements()[3].position()).toEqual([0,-1]);
    });

  });

});
