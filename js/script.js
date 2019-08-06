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
let board, turn, winner, initSq;


/*----- cached element references -----*/ 
let msgEl = document.getElementById('msg');
let btn = document.getElementById('btn');

/*----- event listeners -----*/ 
document.querySelectorAll('img').forEach(img => img.addEventListener('click', handlePiece));



/*----- functions -----*/
function init(){
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
    turn = 1;
    winner = null;
};


function render(){
    //render the board
    board.forEach(function(rowArr, rowIdx){
        rowArr.forEach(function(cell, colIdx){
            let checker = document.getElementById(`r${rowIdx}c${colIdx}`).querySelector('img');
            if(cell === "1K" || cell === "-1K"){
              let king = cell.slice(-1);
              cell = cell.slice(0,-1)
              checker.src = `${PLAYER[cell][king]}`;
            } else if(cell == 1 || cell == -1){
              checker.src = `${PLAYER[cell].P}`
            } else {
              checker.src = "";
            };
        });
    });

    if(winner) {
        if(winner === 'T') {
            msgEl.textContent = 'So Sorry! We have a tie game!!'
        } else {
            msgEl.textContent = `${PLAYER[winner].name} Wins!`
        }
    } else {
        msgEl.textContent = `${PLAYER[turn].name}'s Turn!`
    };
    btn.innerHTML = 'Give Up!';
};

document.getElementById('btn').addEventListener('click', render);

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

init();