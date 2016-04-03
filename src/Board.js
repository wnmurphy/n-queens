(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // declare flag piecesFound
      var piecesFound = 0;
      // for loop through each column
      for (var i = 0; i< rowIndex.length; i++) {
        if (rowIndex[i] === 1){
          piecesFound++;
        }
      }
      if (piecesFound > 1){
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // var to store array of all the rows, using 'this'
      var allRows = this.rows();
      // loop over that array
      for (var i = 0; i < allRows.length; i++) {
        if (this.hasRowConflictAt(allRows[i])) {
          return true;
        }
      }
      return false;
    },

    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // takes in a column index
      // variable that has an array of all rows (allRows)
      var allRows = this.rows();
      // var piecesFound to collect amount of found pieces
      var piecesFound = 0;
      // for loop that loops through row array
      for (var i = 0; i < allRows.length; i++){
        if (allRows[i][colIndex] === 1) {
          piecesFound++;
        }
      }
      if (piecesFound > 1){
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      // variable to hold columns: this.rows().length
      var columns = this.rows().length;
      // for loop, over columns length, individual column is i
      for (var i = 0; i < columns; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var startColumn = majorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      var counter = 0;

      for (var i = 0; i < rows.length; i++){
        if (startColumn >= rows.length){
          break;
        }

        if (rows[i][startColumn] === 1){
          counter++;
        }

        startColumn++;
      }

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var length = this.rows().length;
      for(var column = -length; column < length; column++){
        if ( this.hasMajorDiagonalConflictAt(column) ){
          return true;
        }
      }
      return false;
    },

    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var diagonal = [];
      var length = this.rows().length;
      var startColumn = minorDiagonalColumnIndexAtFirstRow;

      var row = 0;

      for(var i = startColumn; i > startColumn-length; i--){
        if (this.rows()[row][i] !== undefined){
          diagonal.push(this.rows()[row][i]);
        }

        if(row < length-1){
          row++;
        }
      }

      //checking diagonal for conflicts
      var piecesFound = 0;
      for(var j = 0; j < diagonal.length; j++){
        if(diagonal[j] === 1){
          piecesFound++;

        }
      }
      return piecesFound > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {

      var length = this.rows().length;
      for(var column = length*2; column > -1; column--){
        if ( this.hasMinorDiagonalConflictAt(column) ){
          return true;
        }
      }
      return false;
    }
  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };


}());
