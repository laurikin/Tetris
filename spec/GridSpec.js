define(['src/Grid','src/Cell'],function(Grid,Cell){


  describe("Grid", function() {

    var grid;

    beforeEach(function() {
      grid = new Grid({
        columns: 40,
        rows: 10,
        cellSize: 25
      });
    });

    it("exists", function() {
      console.log(grid);
      expect(grid instanceof Grid).toBeTruthy();
    });

    it("has rows", function() {
      expect(grid.rows).toBe(10);
    });

    it("has columns", function() {
      expect(grid.columns).toBe(40);
    });

    it("returns cellsize", function() {
      expect(grid.cellSize).toBe(25)
    });

    describe("cell(column, row)", function() {

      it("returns a cell", function() {
        var cell = grid.cell(3,2);
        expect(cell instanceof Cell).toBeTruthy();
      });

      it("returns a cell in the given position", function() {
        var cell = grid.cell(2,4);
        expect(cell.x).toBe(50);
        expect(cell.y).toBe(100);
      });

    });

    describe("isOutside(point)", function() {

      it("returns true if given point is outside the grid", function() {
        expect(grid.isOutside([100,399])).toBeTruthy();
        expect(grid.isOutside([29,11])).toBeTruthy();
        expect(grid.isOutside([41,3])).toBeTruthy();
      });

      it("returns false if given point is inside the grid", function() {
        expect(grid.isOutside([39,6])).toBeFalsy();
        expect(grid.isOutside([29,9])).toBeFalsy();
      });

    });

  });

});
