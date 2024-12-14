/****
 * Board Creatioin 
 * Start
 ****/
const boardLength = 9;

function sudokuBoard(mode){
    var sudokuBoard = createElement('div', 'sudoku-board');

    for(var row = 0; row < boardLength; row++){
        let boardRow = createElement("div", "board-row");
        for(var col = 0; col < boardLength; col++){
            // let box = createElement("div", "box");
            attr = {
                maxlength: "1",
                "data-row": row,
                "data-col": col
            }
            let box = creatInputFields("input", "text", "user-input", "", "", '', '', attr);
            boardRow.appendChild(box);
        }
        sudokuBoard.appendChild(boardRow);
    }

    var container = document.querySelector('.main-container');
    container.innerHTML = '';
    container.appendChild(sudokuBoard);

    startGame(mode);
}

/****
 * End
 * Board Creatioin 
 ****/

// ----------------------------------------------------------------------------------------------------

/****
 * Game Working
 * Start
 ****/

var numArr = [1,2,3,4,5,6,7,8,9];
var actualGrid = [];
var possibleSolutionGrid = [];
const easyFilledCells = 50;
const normalFilledCells = 40;
const hardFilledCells = 20; 

function fillGridBasedOnDifficulty(mode){
    shuffleNumbers(numArr);
    for(var row = 0; row < boardLength; row++){
        actualGrid[row] = [];
        possibleSolutionGrid[row] = [];
        for(var col = 0; col < boardLength; col++){
            if(numArr.length)
                actualGrid[row][col] = numArr.pop();
            else 
                actualGrid[row][col] = 0;
            
            possibleSolutionGrid[row][col] = 0;
        }
    }
    createSolutionGrid(actualGrid, 0, 0);
    
    switch (mode) {
        case 'easy':
            selectedMode = easyFilledCells;
            break;
        case 'normal':
            selectedMode = normalFilledCells;
            break;
        case 'hard':
            selectedMode = hardFilledCells;
            break;
        default:
            selectedMode = easyFilledCells;
    }

    var board = document.querySelectorAll('.board-row');
    for(var i = 0; i < selectedMode; i++){
        var row = Math.floor(Math.random() * 9);
        var col = Math.floor(Math.random() * 9);
        const boardRows = board[row].querySelectorAll('.user-input');
        boardRows[col].value = actualGrid[row][col];
        boardRows[col].setAttribute('readonly','1');
        possibleSolutionGrid[row][col] = actualGrid[row][col];
    }
}

function startGame(difficulty) {

    fillGridBasedOnDifficulty(difficulty);
    
    var board = document.querySelectorAll('.board-row');
    for (let i = 0; i < 9; i++) {
        const boardRows = board[i].querySelectorAll('.user-input');
        for (let j = 0; j < 9; j++) {
            if (!boardRows[j].hasAttribute('readonly')) {
                boardRows[j].addEventListener('keydown', handleClickEvent);
            }
        }
    }
    console.log('Below is just one of the possible solution of the Problem.');
    console.log("If you create a new possible solution then you are own your own pal :)");
    console.log(actualGrid);
}

function createSolutionGrid(actualGrid, row, col){

    if(row == boardLength - 1 && col == boardLength){
        return true;
    }

    if(col == boardLength){
        col = 0;
        row++;
    }

    if(actualGrid[row][col] != 0){
        return createSolutionGrid(actualGrid, row, col+1);
    }

    for(var num = 1; num <= 9; num++){
        if(isSafeNum(actualGrid, row, col, num)){
            actualGrid[row][col] = num;
            if(createSolutionGrid(actualGrid, row, col + 1))
                return true;        
            actualGrid[row][col] = 0;
        }
    }
    return false;
}

function isSafeNum(actualGrid, row, col, num){

    for(var i = 0; i < boardLength; i++)
        if(actualGrid[row][i] == num)
            return false;

    for(var j = 0; j < boardLength; j++)
        if(actualGrid[j][col] == num)
            return false;

    // TO check if 3*3 grid already has the value
    var startRow = row - row % 3;
    var startCol = col - col % 3;

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(actualGrid[startRow + i][startCol + j] == num)
                return false;
        }
    }

    return true;
}

function shuffleNumbers(array){
    var length = array.length;
    for(var i = 0; i < length; i++){
        j = Math.floor(Math.random()*length);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleClickEvent(event) {
    const inputField = event.target;
    // const userInput = inputField.value; // Get the current value of the input
    const userInput = event.key; // Get the current value of the input
    if (!/[1-9]/.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
        return false;
    }

    var row = inputField.getAttribute("data-row");
    var col = inputField.getAttribute("data-col");


    if(/[1-9]/.test(event.key)){
        // if (userInput == actualGrid[row][col]) {
        if (isSafeNum(possibleSolutionGrid, row, col, userInput)) {
            possibleSolutionGrid[row][col] = userInput;
            inputField.style.backgroundColor = '#87ff87'; // Right box (valid input)
        } else {
            inputField.style.backgroundColor = '#ff5b77'; // only if wrong digit is typed
        }
    } else {
        inputField.style.backgroundColor = 'white';
    }
}


/****
 * End
 * Game Working
 ****/

// ----------------------------------------------------------------------------------------------------


// Function to create Element
function createElement(el, cName='', idName=''){
    var element = document.createElement(el);
    cName && (element.className = cName);
    idName && (element.id = idName);

    return element;
}
function creatInputFields(el, type='', cName='', idName='', value='',eventName='', eventFunction=null, attributes = {}){
    var element = document.createElement(el);
    type && (element.type = type);
    cName && (element.className = cName);
    idName && (element.id = idName);
    value && (element.value = value);
    (eventName && eventFunction) && element.addEventListener(eventName, eventFunction);

    for (const [key, val] of Object.entries(attributes)) {
        element.setAttribute(key, val);
    }

    return element;
}