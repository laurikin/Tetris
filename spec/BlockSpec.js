define(['src/Block','src/DB', 'src/Grid','src/CollisionDetector'],function(Block,DB,Grid,CollisionDetector){

  //blocktype[1]: [[-1,1],[0,1],[1,1],[1,0]]


  describe("Block", function() {

    var block;

    beforeEach(function() {
      DB.grid = new Grid(8,18);
      block = new Block({
        type: 1,
        center: [4,4]
      });
    });

    it("exists", function() {
      block = new Block();
      console.log(block);
      expect(block instanceof Block).toBeTruthy();
    });

    it("has type", function() {
      expect(block.type).toBe(1)
    });

    it("has schema", function() {
      var schema = [[-1,1],[0,1],[1,1],[1,0]]
      expect(block.schema).toEqual(schema);
    });

    it("has color", function() {
      expect(block.color).toBe('#00f');
    });

    it("has center", function() {
      expect(block.center).toEqual([4,4]);
    });

    it("has elements", function() {
      expect(block.elements[0].position).toEqual([3,5]);
    });


    describe("if space", function() {

      it("moves left", function() {
        block.moveLeft();
        expect(block.elements[0].position).toEqual([2,5]);
        expect(block.elements[1].position).toEqual([3,5]);
        expect(block.elements[2].position).toEqual([4,5]);
        expect(block.elements[3].position).toEqual([4,4]);
      });

      it("moves right", function() {
        block.moveRight();
        expect(block.elements[0].position).toEqual([4,5]);
        expect(block.elements[1].position).toEqual([5,5]);
        expect(block.elements[2].position).toEqual([6,5]);
        expect(block.elements[3].position).toEqual([6,4]);
      });

      it("rotates", function() {
        //blocktype 2: [[-1,1],[0,1],[1,1],[1,0]]
        block.rotate();
        expect(block.elements[0].position).toEqual([5,5]);
        expect(block.elements[1].position).toEqual([5,4]);
        expect(block.elements[2].position).toEqual([5,3]);
        expect(block.elements[3].position).toEqual([4,3]);
      });

    });

  });

});
