/*----- constants -----*/ 
let PLAYER = {
    "0": null,
    "1": "Black",
    "-1": "White",
};
let PIECES = {
    "1": "img/black_piece.png",
    "1K": "img/black_king.png",
    "-1": "img/white_piece.png",
    "-1K": "img/white_kings.png",
};

/*----- app's state (variables) -----*/ 
let board, turn, winner;


/*----- cached element references -----*/ 
let msgEl = document.getElementById('msg');


/*----- event listeners -----*/ 



/*----- functions -----*/
function init(){
    board = [
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    turn = 1;
    winner = null;
    // render();
}

function render(){
    //render the board
    board.forEach(function(colArr, colIdx){
        colArr.forEach(function(cell, rowIdx){
            let piece = document.getElementById(`r${rowIdx}c${colIdx}`);
            piece.
        })
    });
}