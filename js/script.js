/*----- constants -----*/ 
let PLAYER {
    "0": null;
    "1": Red;
    "-1": White;
}


/*----- app's state (variables) -----*/ 
let board, turn, winner;


/*----- cached element references -----*/ 
let msgEl = getElementById('msg');


/*----- event listeners -----*/ 



/*----- functions -----*/
function init(){
    board = {
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
}