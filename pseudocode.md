1. Define required constants:
	1. Define a colors object with keys of 'null' (when the piece div is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1.
	2. Define the winning move, when a player no longer has any pieces on the board

2. Define required variables used to track the state of the game:
	1. Use a board array to represent the squares.	
  2. Use a turn variable to remember whose turn it is.
	3. Use a winner variable to represent four different possibilities - player that won, a tie, game in play, or player resigned.


3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
	1. Store the elements that represent the squares and pieces on the page.

4. Upon loading the app should:
	1. Initialize the state variables:
		1. Initialize the board array to 64 nulls to represent empty squares. The 64 elements will "map" to each square, where index 0 maps to the top-left square and index 64 maps to the bottom-right square.
		2. Initialize whose turn it is to 1 (player 'Blue'). Player 'White' will be represented by -1.
		3. Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie, 'G' if player gave up. 
    4. Ask for player names.
	2. Render those state variables to the page:
		1. Render the board:
			1. Loop over each of the 64 elements that represent the squares on the page, and for each iteration:
				1. Use the index of the iteration to access the mapped value from the board array.
				2. Set the background color of the inner DIV element by using the value as a key on the colors lookup object (constant).
		2. Render a message:
			1. If winner has a value other than null (game still in progress), render whose turn it is - use the given name for the player, converting it to upper case.
			2. If winner is equal to 'T' (tie), render a tie message.
      3. If player gave up set winner to 'G', render give up mesage.
			4. Otherwise, render a congratulatory message to which player has won - use the name for the player, converting it to uppercase.
	3. Wait for the user to click a square

5. Handle a player making a move:
	1. Obtain the index of the piece to be moved that was clicked by either:
		1. "Extracting" the index from an id assigned to the element in the HTML, or
		2. Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
    3. Verify that a move was valid based on the rules of the game.
	2. If the board has a value at the index, if move was valid, capture the piece and increase "Pieces Captured" amount.
	3. If winner is not null, immediately return because the game is over.
	4. Update the board array at the index with the value of turn.
	5. Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
	6. Set the winner variable if there's a winner:
		1. Loop through the each of the winning combination arrays defined.
		2. Total up the three board positions using the three indexes in the current combo.
		3. Convert the total to an absolute value (convert any negative total to positive).
		4. If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
	7. If there's no winner, check if there's a tie:
		1. Set winner to 'T' if there are no more nulls in the board array.
	8. All state has been updated, so render the state to the page (step 4.2).
		

6. Handle a player clicking the give-up button:
	1. Do steps 4.1 (initialize the state variables) and 4.2 (render).

7. Handle a player "kinging" a piece:
  1. Render King Message
  2. Render King piece
  3. Continue game