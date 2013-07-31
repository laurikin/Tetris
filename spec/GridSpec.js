define(['src/Grid'],function(Grid){


  describe("Grid", function() {

    var grid;

    beforeEach(function() {
      grid = Grid(40,10,25);
    });

    it("exists", function() {
      expect(grid.toString()).toEqual('object Grid');
    });

    it("has rows", function() {
      expect(grid.rows).toBe(10);
    });

    it("has columns", function() {
      expect(grid.columns).toBe(40);
    });

    it("returns cellsize", function() {
      expect(grid.cellSize()).toBe(25)
    });

    describe("cell(column, row)", function() {

      it("returns a cell", function() {
        var cell = grid.cell(3,2);
        expect(cell.toString()).toEqual('object Cell');
      });

      it("returns a cell in the given position", function() {
        var cell = grid.cell(2,4);
        expect(cell.x).toBe(50);
        expect(cell.y).toBe(100);
      });

    });

    describe("outside(point)", function() {

      it("returns true if given point is outside the grid", function() {
        expect(grid.outside([100,399])).toBeTruthy();
        expect(grid.outside([29,11])).toBeTruthy();
        expect(grid.outside([41,3])).toBeTruthy();
      });

      it("returns false if given point is inside the grid", function() {
        expect(grid.outside([39,6])).toBeFalsy();
        expect(grid.outside([29,9])).toBeFalsy();
      });

    });

  });

});
