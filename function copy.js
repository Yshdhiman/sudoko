/****
 * Board Creatioin 
 * Start
 ****/
const boardLength = 3;
var mainBoard = createElement('div', 'sudoku-board');

function sudokuBoard(){

    for(var row = 0; row < boardLength; row++){
        for(var col = 0; col < boardLength; col++){
            mainBoard.appendChild(subBoard());
        }
    }

    var container = document.querySelector('.main-container');
    container.innerHTML = '';
    container.appendChild(mainBoard);
}

function subBoard(){
    var subBoard = createElement('div', 'sub-board');

    for(var row = 0; row < boardLength; row++){
        for(var col = 0; col < boardLength; col++){
            let box = createElement("div", "box");
            box.addEventListener('click', handleClickEvent)
            subBoard.appendChild(box);
        }
    }

    return subBoard;
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

var numArr = ['0','1','2','3','4','5','6','7','8','9'];

function handleClickEvent(event){
    const box = event.target;
    
    box.style.backgroundColor = '#87ff87' // for right box
    box.style.backgroundColor = '#ff5b77'; //for wrong box
}

function shuffleNumbers(array){
    var length = array.length;
    for(var i = 0; i < length; i++){
        j = Math.floor(Math.random()*length);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

setInnerBoxValues();
function setInnerBoxValues(){
    var innerBoxes = [];
    let rowArr = [];
    var length = boardLength*boardLength;
    for(var row = 0; row < length; row++){
        innerBoxes[row] = [];
        rowArr = shuffleNumbers([...numArr]);
        for(var col = 0; col < length; col++){
            var traverseCol = 0,
                traverseArr = 0;
            
            // for(var i = 0; i < innerBoxes[row].length; ){
            //     if(innerBoxes[traverseCol][col] == rowArr[traverseArr]){
            //         traverseArr++;
            //         i = 0;
            //     } else {
            //         traverseCol++;
            //         i++;
            //     }
            // }
            innerBoxes[row][col] = rowArr.pop();
            // innerBoxes[row][col] = rowArr.splice();
            console.log(innerBoxes[row][col]);
        }
    }
    console.log(innerBoxes)
}

/****
 * End
 * Game Working
 ****/

// ----------------------------------------------------------------------------------------------------


// Function to create Element
function createElement(el, cName='', idName='', value=''){
    var element = document.createElement(el);
    cName && (element.className = cName);
    idName && (element.id = idName);
    value && (element.value = value);

    return element;
}