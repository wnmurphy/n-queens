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
      console.log("the board", board);
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
  var solutions = [];
  var solutionCount = solution.length; 
  var board = new Board({n: n});

  // Define recursive function that places subsequent rooks on each square and checks for conflict on existing board.
  var recursivePlaceRook = function(row, column){
    var rookCount = 0;
    
    for (var row = row; row < n; row++){
      for (var column = column; column < n; column++){
        
        board.togglePiece(row, column); //add rook

        if(board.hasAnyRooksConflicts()){ 
          board.togglePiece(row, column); //remove rook if conflict
        } else { 
          rookCount++; 
          // recursivePlaceRook(??);        //since only 1 rook or queen/row, could try incrementing row after placement
        }
      }
    }
    // Base case. Push solution when n rooks are placed and stop.
    if (rookCount === n){
      solutions.push(board.rows());
    }
  }
  
  // start recursivePlaceRook on every square of the board:
  for (var row = row; row < n; row++){
    for (var column = column; column < n; column++){
      recursivePlaceRook(rows, column);
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
