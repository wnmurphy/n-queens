/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = 0;
  var board = new Board({n: n});

  // loop through board.rows()[row][column]
  for(var row = 0; row < n; row++){
    for(var column = 0; column < n; column++){
      board.togglePiece(row, column); //add rook

      if(board.hasAnyRooksConflicts()){
        board.togglePiece(row, column); //remove rook
      }
    }
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;    
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});

  var recurseRooks = function (row){
    
    // base case: we've finished all the rows for this branch
    if( row === n){
      // add a solution
      solutionCount++;
      // stop
      return;
    }

    // iterate over columns for the current row 
    for (var column = 0; column < n; column++){
        
        //add rook
        board.togglePiece(row, column);

        // If that rook generates no conflicts, recurse further
        if(!board.hasAnyRooksConflicts() ){ 
          recurseRooks(row+1);
        }

        // remove rook to reset board for other branches
        board.togglePiece(row, column);
    }
  }
  // begin recursion on first row.
  recurseRooks(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});

  var recurseQueens = function (row){
    
    // base case: we've finished all the rows for this branch
    if( row === n){
      // add a solution
      solutionCount++;
      // stop
      return;
    }

    // iterate over columns for the current row 
    for (var column = 0; column < n; column++){
        //add queen
        board.togglePiece(row, column);
        // If that queen generates no conflicts, recurse further
        if( !board.hasAnyQueensConflicts() ){ 
          recurseQueens(row+1);
        }
        // remove queen to reset board for other branches
        board.togglePiece(row, column);
    }
  }
  // begin recursion on first row.
  recurseQueens(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});

  var recurseQueens = function (row){
    
    // base case: we've finished all the rows for this branch
    if( row === n){
      // add a solution
      solutionCount++;
      // stop
      return;
    }

    // iterate over columns for the current row 
    for (var column = 0; column < n; column++){
        //add queen
        board.togglePiece(row, column);
        // If that queen generates no conflicts, recurse further
        if( !board.hasAnyQueensConflicts() ){ 
          recurseQueens(row+1);
        }
        // remove queen to reset board for other branches
        board.togglePiece(row, column);
    }
  }
  // begin recursion on first row.
  recurseQueens(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
