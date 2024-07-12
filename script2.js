const wordsAndClues = [
  { word: 'GRUNGE', clue: 'Untidy look to mimic punk and heavy metal rock bands', row: 0, col: 5, direction: 'down' },
  { word: 'RUNWAY', clue: 'Where fashion models strut their stuff', row: 3, col: 3, direction: 'across' },
  { word: 'ACUBI', clue: 'Minimalistic fashion style originating in Korea', row: 2, col: 3, direction: 'across' },
  { word: 'BLAZER', clue: 'A more casual suit jacket', row: 5, col: 1, direction: 'across' },
  { word: 'BOHO', clue: 'Free-spirited and unconventional style', row: 5, col: 1, direction: 'down' },
  { word: 'CHIC', clue: 'Elegant and stylish', row: 7, col: 0, direction: 'across' }
];

const gridSize = 10; // Adjust based on your puzzle size

const crossword = document.getElementById('crossword');
const cluesContainer = document.getElementById('clues');
const cells = [];

let activeCell = null;

// Create empty grid with grey cells
for (let i = 0; i < gridSize; i++) {
  cells[i] = [];
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = i;
    cell.dataset.col = j;
    cells[i][j] = cell;
    crossword.appendChild(cell);

    // Make cells grey (unwritable)
    cell.classList.add('grey');

    // Handle click to set active cell
    cell.addEventListener('click', function() {
      if (!cell.classList.contains('grey') && !cell.classList.contains('correct')) {
        setActiveCell(cell);
      }
    });
  }
}

// Place words in the grid
wordsAndClues.forEach(wordObj => {
  const word = wordObj.word.toUpperCase();
  const row = wordObj.row;
  const col = wordObj.col;
  const direction = wordObj.direction;

  let currentRow = row;
  let currentCol = col;

  // Place the word in the grid
  for (let i = 0; i < word.length; i++) {
    const cell = cells[currentRow][currentCol];
    cell.dataset.word = word; // Store the word in the dataset for validation later
    cell.dataset.direction = direction;
    cell.dataset.index = i; // Store the index of the letter in the word
    cell.classList.remove('grey'); // Make cell writable
    currentRow += (direction === 'down') ? 1 : 0;
    currentCol += (direction === 'across') ? 1 : 0;
  }

  // Display clue
  const clueDiv = document.createElement('div');
  clueDiv.classList.add('clue');
  clueDiv.textContent = `${wordObj.clue} (${direction === 'across' ? 'Across' : 'Down'}) - Starting at (${row},${col})`;
  cluesContainer.appendChild(clueDiv);
});

// Function to set active cell
function setActiveCell(cell) {
  if (activeCell) {
    activeCell.classList.remove('active');
  }
  activeCell = cell;
  activeCell.classList.add('active');
}

// Handle key press for entering letters
document.addEventListener('keydown', function(event) {
  if (activeCell && !activeCell.classList.contains('grey') && !activeCell.classList.contains('correct')) {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) { // Ensure the key pressed is a letter
      handleKeyPress(activeCell, key);
    }
  }
});

// Function to handle key press
function handleKeyPress(cell, key) {
  const word = cell.dataset.word;
  const index = parseInt(cell.dataset.index);

  if (word[index] === key) {
    cell.textContent = key;
    cell.classList.remove('incorrect');
    cell.classList.add('correct');
    cell.classList.add('grey'); // Make cell non-writable once correct
    checkWordCompletion(cell);
  } else {
    cell.textContent = key;
    cell.classList.remove('correct');
    cell.classList.add('incorrect');
  }
}

// Function to check if a word is completed
function checkWordCompletion(cell) {
  const word = cell.dataset.word;
  const direction = cell.dataset.direction;
  let currentRow = parseInt(cell.dataset.row);
  let currentCol = parseInt(cell.dataset.col);

  let wordInProgress = '';

  for (let i = 0; i < word.length; i++) {
    const cellContent = cells[currentRow][currentCol].textContent;
    if (cellContent === '') return;
    wordInProgress += cellContent;
    currentRow += (direction === 'down') ? 1 : 0;
    currentCol += (direction === 'across') ? 1 : 0;
  }

  if (wordInProgress === word) {
    console.log(`Congratulations! You completed the word: ${word}`);
    checkGameCompletion();
  }
}

// Function to check if the entire crossword puzzle is completed
function checkGameCompletion() {
  const allCells = crossword.querySelectorAll('.cell');
  const allNonWritable = Array.from(allCells).filter(cell => cell.classList.contains('grey')).length;
  if (allNonWritable === gridSize * gridSize) {
    console.log('Congratulations! You completed the crossword puzzle!');
    alert('Congratulations! You completed the crossword puzzle!');
  }
}
