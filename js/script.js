/*----- constants -----*/ 
let PLAYER = {
    "0": 0,
    "1": {
        name: "Black",
        P: "img/black_piece.png",
        K: "img/black_king.png",
        score: 0,
    },
    "-1": {
        name: "White",
        P: "img/white_piece.png",
        K: "img/white_king.png",
        score: 0,
    },
};

class piece{
    constructor(colorCode, rankCode){
        this.colorCode = colorCode;
        this.rankCode = rankCode;
        this.code = `${colorCode}${rankCode}`;
        this.colorIdent = function(){
            if(this.colorCode == 1){
                return 'black';
            }else{
                return 'white';
            };
        };
        this.rankIdent = function(){
            if(this.rankCode == 'K'){
                return 'king';
            }else{
                return 'piece';
            };
        };
        this.color = this.colorIdent();
        this.rank = this.rankIdent();
        this.img = `img/${this.color}_${this.rank}.png`;

    };

    move(initIdx, finIdx, pieceMoved){ 
        board[finIdx['row']][finIdx['col']] = pieceMoved;
        board[initIdx['row']][initIdx['col']] = 0;

        render();

    };

    checkDest(initIdx, finIdx, pieceMoved, pieceMovedTo){
        console.log(this.colorCode);
        console.log(!pieceMovedTo.colorCode == this.colorCode);
        if(pieceMovedTo == 0){
            this.move(initIdx, finIdx, pieceMoved, pieceMovedTo);
        } else if (!pieceMovedTo == 0){
            if(pieceMovedTo.colorCode == this.colorCode){
                alert("You can't jump your own piece");
            } else {
                console.log('jump');
            }
        }
    };

    checkMove(initSq, initIdx, finIdx, pieceMoved, pieceMovedTo){
        if(parseInt(initIdx['col'] - finIdx['col']) == -1 || parseInt(initIdx['col'] - finIdx['col']) == 1){        
            if(parseInt(initIdx['row'] - finIdx['row']) < 0 && parseInt(initIdx['row'] - finIdx['row']) >= -1 && pieceMoved.colorCode == 1) {
                this.checkDest(initIdx, finIdx, pieceMoved, pieceMovedTo);
            } else if(parseInt(initIdx['row'] - finIdx['row']) > 0 && parseInt(initIdx['row'] - finIdx['row']) <= 1 && pieceMoved.colorCode == -1){
                this.checkDest(initIdx, finIdx, pieceMoved, pieceMovedTo);
            } else if(this.rank == 'king'){
                this.checkDest(initIdx, finIdx, pieceMoved, pieceMovedTo);
            } else {
                initSq.target.style.opacity = '1';
                alert('This Move is Not Valid!');   
            };

        } else {
            initSq.target.style.opacity = '1';
            alert('This Move is Not Valid!');
        };
    };
    // jump(initSq, initIdx, finIdx, pieceMoved, pieceMovedTo){
    //     if(piece)
    // };
};

/*----- app's state (variables) -----*/ 
let board, turn, winner, initSq, blackScore, whiteScore;
let b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12;
let w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12;


/*----- cached element references -----*/ 
let msgEl = document.getElementById('msg');
let btn = document.getElementById('btn');

/*----- event listeners -----*/ 
document.querySelectorAll('td').forEach(td => td.addEventListener('click', handlePiece));

btn.addEventListener('click', function () {if(btn.textContent === 'Start'){start();}else{init();render();}});

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
    PLAYER[1].score = 0
    PLAYER[-1].score = 0
    btn.textContent = 'Start';
};

function render(){
    //render the board
    board.forEach(function(rowArr, rowIdx){
        rowArr.forEach(function(cell, colIdx){
            let checker = document.getElementById(`r${rowIdx}c${colIdx}`);
            if(!cell == 0){
                checker.innerHTML = `<img src='${cell.img}'>`;
            } else {
                checker.innerHTML = '';
            };
        });
    });
    getWinner();
};

function start() {
    b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = b10 = b11 = b12 = new piece('1','P');
    w1 = w2 = w3 = w4 = w5 = w6 = w7 = w8 = w9 = w10 = w11 = w12 = new piece('-1','P');
    board = [
        [0, b1, 0, b2, 0, b3, 0, b4],
        [b5, 0, b6, 0, b7, 0, b8, 0],
        [0, b9, 0, b10, 0, b11, 0, b12],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [w1, 0, w1, 0, w3, 0, w4, 0],
        [0, w5, 0, w6, 0, w7, 0, w8],
        [w9, 0, w10, 0, w11, 0, w12, 0],
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
        initSq = null;
    }
};

function handleInitPieceSelctor(initEvt){
    document.querySelectorAll('td').forEach(img => img.setAttribute('style', '1'));
    initEvt.target.style.opacity = '0.5';
};

function handlePieceMove(iSq, fSq){
    let initIdx = {
        'row' : iSq.target.parentElement.id.charAt(1),
        'col' : iSq.target.parentElement.id.charAt(3),
    };
    let finIdx = {
        'row' : fSq.target.id.charAt(1),
        'col' : fSq.target.id.charAt(3),
    };
    
    let pieceMoved = board[initIdx['row']][initIdx['col']];

    if(finIdx['row'] === ''){
        finIdx = {
            'row' : fSq.target.parentElement.id.charAt(1),
            'col' : fSq.target.parentElement.id.charAt(3),
        }
    };
    let pieceMovedTo = board[finIdx['row']][finIdx['col']];

    
    pieceMoved.checkMove(initSq, initIdx, finIdx, pieceMoved, pieceMovedTo);
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
    turn *= -1;
};

init();
