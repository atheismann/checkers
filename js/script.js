/*----- constants -----*/ 
let PLAYER = {
    "0": 0,
    "1": {
        name: "Black",
        P: "img/black_piece.png",
        K: "img/black_king.png",
    },
    "-1": {
        name: "White",
        P: "img/white_piece.png",
        K: "img/white_king.png",
    },
};
/*----- app's state (variables) -----*/ 
let board, turn, winner;


/*----- cached element references -----*/ 
let msgEl = document.getElementById('msg');


/*----- event listeners -----*/ 



/*----- functions -----*/
function init(){
    board = [
        [0, 1, 0, 1, 0, "1K", 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, -1, 0, -1, 0,-1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
    ];
    turn = 1;
    winner = null;
    render();
}


function render(){
    //render the board
    board.forEach(function(rowArr, rowIdx){
        rowArr.forEach(function(cell, colIdx){
            let checker = document.getElementById(`r${rowIdx}c${colIdx}`);
            if(cell === "1K" || cell === "-1K"){
              let king = cell.slice(-1);
              cell = cell.slice(0,-1)
              checker.src = `${PLAYER[cell][king]}`;
            } else if(cell === 1 || cell === -1){
              checker.src = `${PLAYER[cell].P}`
            };
        });
    });
}