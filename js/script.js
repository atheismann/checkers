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
let board, turn, winner, initSq, blackScore, whiteScore;


/*----- cached element references -----*/ 
let msgEl = document.getElementById('msg');
let btn = document.getElementById('btn');

/*----- event listeners -----*/ 
document.querySelectorAll('img').forEach(img => img.addEventListener('click', handlePiece));
btn.addEventListener('click', function () {if(btn.textContent === 'Start'){start();}else{init();
render();}});




/*----- functions -----*/
function init(){
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    turn = 1;
    winner = null;
    btn.textContent = 'Start';
};


function render(){
    //render the board
    board.forEach(function(rowArr, rowIdx){
        rowArr.forEach(function(cell, colIdx){
            let checker = document.getElementById(`r${rowIdx}c${colIdx}`).querySelector('img');
            if(cell === "1K" || cell === "-1K"){
              let king = cell.slice(-1);
              cell = cell.slice(0,-1);
              checker.src = `${PLAYER[cell][king]}`;
            } else if(cell == 1 || cell == -1){
              checker.src = `${PLAYER[cell].P}`;
            } else {
              checker.src = "";
            };
        });
    });
    getWinner();
};

function start() {
    board = [
        [0, "1K", 0, 1, 0, "1", 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, "1K", 0, 0],
        [0, 0, "-1K", 0, 0, 0, 0, 0],
        [-1, 0, -1, 0, "-1", 0,-1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
    ];
    render();
    btn.textContent = 'Give Up!';


}

function handlePiece(evt){
    if(!initSq) {
        initSq = evt;
        handleInitPieceSelctor(evt);
    } else if (initSq) {
        handlePieceMove(initSq, evt);
        // document.querySelectorAll('img').forEach(img => img.getAttribute('opacity') === '0.5')
    }
};

function handleInitPieceSelctor(initEvt){
    initSq = initEvt;
    document.querySelectorAll('img').forEach(img => img.setAttribute('style', '1'));
    initEvt.target.style.opacity = "0.5";
};

function handlePieceMove(iSq, fSq){
    let initRowIdx = iSq.target.parentElement.id.charAt(1);
    let initColIdx = iSq.target.parentElement.id.charAt(3);
    let finRowIdx = fSq.target.id.charAt(1);
    let finColIdx = fSq.target.id.charAt(3);

    if(board[initRowIdx][initColIdx] == 1 || board[initRowIdx][initColIdx] == -1 || board[initRowIdx][initColIdx] == 0){
        board[initRowIdx][initColIdx] = 0;
        board[finRowIdx][finColIdx] = turn;
    } else if(board[initRowIdx][initColIdx] == "1K" || board[initRowIdx][initColIdx] == "-1K"){
        board[initRowIdx][initColIdx] = 0;
        board[finRowIdx][finColIdx] = `${turn}K`;
    }

    render();
};

function getWinner(){
    if(blackScore === 12) {
        winner = 1
    } else if(whiteScore === 12){
        winner = -1
    };
    if(winner) {
        msgEl.textContent = `${PLAYER[winner].name} Wins!`;
    } else {
        msgEl.textContent = `${PLAYER[turn].name}'s Turn!`
    };

};

init();