/*----- app's state (variables) -----*/ 
let board, turn, winner, initSq, initIdx, finIdx, pieceMoved, pieceMovedTo;
let b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12;
let w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12;


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
    constructor(id ,colorCode, rankCode, location){
        this.id = id
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
        this.location = location;

    };

    move(){ 
        board[finIdx[0]][finIdx[1]] = pieceMoved;
        board[initIdx[0]][initIdx[1]] = 0;

        render();

        this.checkKing();

        turn *= -1;

    };

    checkDest(){
        if(pieceMovedTo == 0){
            this.move();
        } else if (!pieceMovedTo == 0){
            if(pieceMovedTo.colorCode == this.colorCode){
                initSq.target.style.opacity = '1';
                alert("You can't jump your own piece");
            } else {
                initSq.target.style.opacity = '1';
                alert('Try Again, Select the space on the other side of the piece you want to jump!');   
            };
        };
    };

    checkBasicMove(){
        if(parseInt(initIdx[1] - finIdx[1]) == -1 || parseInt(initIdx[1] - finIdx[1]) == 1){        
            if(parseInt(initIdx[0] - finIdx[0]) < 0 && parseInt(initIdx[0] - finIdx[0]) >= -1 && pieceMoved.colorCode == 1) {
                this.checkDest();
            } else if(parseInt(initIdx[0] - finIdx[0]) > 0 && parseInt(initIdx[0] - finIdx[0]) <= 1 && pieceMoved.colorCode == -1){
                this.checkDest();
            } else if(this.rank == 'king'){
                this.checkDest();
            } else {
                initSq.target.style.opacity = '1';
                alert('This Move is Not Valid!');   
            };
        } else {
            this.checkJumpMove();
        };
    };

    checkJumpMove(){
        if((parseInt(initIdx[1] - finIdx[1]) == -2 || parseInt(initIdx[1] - finIdx[1]) == 2) || parseInt(initIdx[1] - finIdx[1]) == 0){
            let jumpedPiece = [];
            jumpedPiece[0] = (finIdx[0] - initIdx[0])/2;
            jumpedPiece[1] = (finIdx[1] - initIdx[1])/2;
            let jumpIdx = initIdx.map(function(num,idx){return num + jumpedPiece[idx]});
            if(board[jumpIdx[0]][jumpIdx[1]].colorCode === pieceMoved.colorCode){
                msgEl.textContent = "You can't jump your own piece";
            }else{
                board[jumpIdx[0]][jumpIdx[1]] = 0;
                if(pieceMoved.colorCode === 1){
                    PLAYER[1].score += 1;
                } else if (pieceMoved.colorCode === -1){
                    PLAYER[-1].score += 1;
                };
                this.move();
            };
        };
    };
    kingMe(){
        this.rankCode = 'K';
        this.rank = 'king';
        this.img = `img/${this.color}_king.png`;
        this.code = `${this.colorCode}K`;
        render();
    };
    checkKing(){
        if (this.location[0] === 7 && this.colorCode === 1){
            this.kingMe();
        } else if (this.location[0] === 0 && this.colorCode === -1){
            this.kingMe();
        } else {
            return;
        };
    };
};


/*----- cached element references -----*/ 
let msgEl = document.getElementById('msg');
let btn = document.getElementById('btn');

/*----- event listeners -----*/ 
document.querySelectorAll('td').forEach(td => td.addEventListener('click', handleClick));

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
                cell.location = [rowIdx, colIdx];
            } else {
                checker.innerHTML = '';
            };
        });
    });
    getWinner();
};

function start() {
    setInitPiece();
    board = [
        [0, b1, 0, b2, 0, b3, 0, b4],
        [b5, 0, b6, 0, b7, 0, b8, 0],
        [0, b9, 0, b10, 0, b11, 0, b12],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [w1, 0, w2, 0, w3, 0, w4, 0],
        [0, w5, 0, w6, 0, w7, 0, w8],
        [w9, 0, w10, 0, w11, 0, w12, 0],
    ];
    render();
    btn.textContent = 'Give Up!';

}

function handleClick(evt){
    if(initSq === 'jump'){
        jump(evt);
    } else {
        handlePiece(evt);
    }
};

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
    initIdx = [
        parseInt(iSq.target.parentElement.id.charAt(1)),
        parseInt(iSq.target.parentElement.id.charAt(3)),
    ];
    finIdx = [
        parseInt(fSq.target.id.charAt(1)),
        parseInt(fSq.target.id.charAt(3)),
    ];
    
    pieceMoved = board[initIdx[0]][initIdx[1]];

    if(finIdx[0] === ''){
        finIdx = {
            'row' : parseInt(fSq.target.parentElement.id.charAt(1)),
            'col' : parseInt(fSq.target.parentElement.id.charAt(3)),
        }
    };
    pieceMovedTo = board[finIdx[0]][finIdx[1]];

    
    pieceMoved.checkBasicMove();
};

function getWinner(){
    if(PLAYER[1].score === 12) {
        winner = 1
    } else if(PLAYER[-1].score === 12){
        winner = -1
    };
    if(winner) {
        msgEl.textContent = `${PLAYER[winner].name} Wins!`;
    } else {
        msgEl.textContent = `${PLAYER[turn].name}'s Turn!`
    };
};
function setInitPiece() {
    b1 = new piece ('b1', 1, 'P', [0,1]);
    b2 = new piece ('b2', 1, 'P', [0,3]);
    b3 = new piece ('b3', 1, 'P', [0,5]);
    b4 = new piece ('b4', 1, 'P', [0,7]);
    b5 = new piece ('b5', 1, 'P', [1,0]);
    b6 = new piece ('b6', 1, 'P', [1,2]);
    b7 = new piece ('b7', 1, 'P', [1,4]);
    b8 = new piece ('b8', 1, 'P', [1,6]);
    b9 = new piece ('b9', 1, 'P', [2,1]);
    b10 = new piece ('b10', 1, 'P', [2,3]);
    b11 = new piece ('b11', 1, 'P', [2,5]);
    b12 = new piece ('b12', 1, 'P', [2,7]);
    w1 = new piece ('w1', -1, 'P', [5,0]);
    w2 = new piece ('w2', -1, 'P', [5,2]);
    w3 = new piece ('w3', -1, 'P', [5,4]);
    w4 = new piece ('w4', -1, 'P', [5,6]);
    w5 = new piece ('w5', -1, 'P', [6,1]);
    w6 = new piece ('w6', -1, 'P', [6,3]);
    w7 = new piece ('w7', -1, 'P', [6,5]);
    w8 = new piece ('w8', -1, 'P', [6,7]);
    w9 = new piece ('w9', -1, 'P', [7,0]);
    w10 = new piece ('w10', -1, 'P', [7,2]);
    w11 = new piece ('w11', -1, 'P', [7,4]);
    w12 = new piece ('w12', -1, 'P', [7,6]);
};

function jump(newSq){
    console.log(newSq);
    // let jumpIdx = {
    //     'row' : newSq.target.id.charAt(1),
    //     'col' : newSq.target.id.charAt(3),
    // };
    // console.log(jumpIdx);
    // console.log(parseInt(newSq));
    // console.log(pieceMovedTo);
    // console.log(initIdx);
    // console.log(finIdx);
    // while (pieceMovedTo.color){
    //     msgEl.textContent = 'Select Square to Jump to';
    //     console.log(newSq);
    //     console.log(pieceMovedTo);
    //     console.log(initIdx);
    //     console.log(finIdx);
    //     pieceMoved = pieceMovedTo;
    //     finIdx[0] = newSq.target.id.charAt(1);
    //     finIdx[1] = newSq.target.id.charAt(3);
    //     pieceMovedTo = board[finIdx[0]][finIdx[1]];
    //     console.log(pieceMovedTo);
    //     console.log(initIdx);
    //     console.log(finIdx);
    //     break;
    // }
}

init();
