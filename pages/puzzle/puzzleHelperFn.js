const PuzzleWidth = 3
const SolvedPuzzle = [1, 2 ,3 ,4, 5, 6, 7, 8, 0]

export function getMoveableValues(puzzleState) {
    const PuzzleWidth = 3  
    const emptySpaceIndex = puzzleState.findIndex((value) => value == 0)
    let moveableValues = []
    const emptySpaceCoOrd = {
      row: Math.floor(emptySpaceIndex / PuzzleWidth),
      col:
        emptySpaceIndex - PuzzleWidth * Math.floor(emptySpaceIndex / PuzzleWidth),
    }
    //Value Right of Empty Sapce
    if (emptySpaceCoOrd.col + 1 < PuzzleWidth) {
      moveableValues.push(puzzleState[emptySpaceIndex + 1])
    }
    //Value Left of Empty Sapce
    if (emptySpaceCoOrd.col - 1 >= 0) {
      moveableValues.push(puzzleState[emptySpaceIndex - 1])
    }
    // Value Below
    if (emptySpaceCoOrd.row + 1 < PuzzleWidth) {
      moveableValues.push(puzzleState[emptySpaceIndex + PuzzleWidth])
    }
    // Value Above
    if (emptySpaceCoOrd.row - 1 >= 0) {
      moveableValues.push(puzzleState[emptySpaceIndex - PuzzleWidth])
    }
    return moveableValues
  }

// Function to Check the Total Inversions of the Puzzle
// Based on https://en.wikipedia.org/wiki/15_puzzle and https://en.wikipedia.org/wiki/Inversion_(discrete_mathematics)
export function checkInversions(puzzleState) {
    let inversions = 0;
    for (let i = 0; i < puzzleState.length; i++) {
      for (let j = i + 1; j < puzzleState.length; j++) {
        if (puzzleState[i] > puzzleState[j] && puzzleState[j] !== 0) {
          inversions++;
        }
      }
    }
    return inversions;
}

export function isPuzzleSolveable(puzzle) {
    return checkInversions(puzzle) % 2 === 0;
}

// Function to Randomise and Initalise Puzzle, Initally Randomly Swaps Tiles...
// If the inital Puzzle is unsolveable based on its inversions will then switch either the first two..
// ..Or last two tiles based on the position of the Empty Square
export function initialisePuzzle(){
    let puzzle = [...SolvedPuzzle];
    const arraySize = PuzzleWidth * PuzzleWidth;
    for (let i = 0; i < puzzle.length; i++) {
      let swapIndex = Math.floor(Math.random() * (arraySize - 1));
      const temp = puzzle[i];
      puzzle[i] = puzzle[swapIndex];
      puzzle[swapIndex] = temp;
    }
    if (isPuzzleSolveable(puzzle) === false) {
      if (puzzle[0] === 0 || puzzle[1] === 0) {
        const temp = puzzle[arraySize - 1];
        puzzle[arraySize - 1] = puzzle[arraySize - 2];
        puzzle[arraySize - 2] = temp;
      } else {
        const temp = puzzle[0];
        puzzle[0] = puzzle[1];
        puzzle[0] = temp;
      }
    }
    return puzzle;
  }