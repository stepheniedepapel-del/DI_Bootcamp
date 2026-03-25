# Tic Tac Toe Game - Complete Single File Implementation
# Topics covered: Lists (2D), Loops (while), Conditionals (if/elif/else), 
# Functions, User input, String formatting

def display_board(board):
    """
    Display the current state of the 3x3 game board.
    Creates a visual grid with row/column separators.
    """
    print("\n" + "=" * 13)
    for i, row in enumerate(board):
        print(" | ".join(f" {cell} " for cell in row))
        if i < 2:  # Don't print separator after last row
            print("-" * 13)
    print("=" * 13 + "\n")


def player_input(board, player):
    """
    Get and validate player input for their move.
    Returns tuple (row, col) of valid move.
    """
    while True:
        try:
            # Get input from player
            move = input(f"Player {player}, enter your move (row col) [0-2 0-2]: ").strip()
            
            # Parse input
            parts = move.split()
            if len(parts) != 2:
                print("❌ Please enter two numbers separated by space (e.g., '1 2')")
                continue
                
            row, col = int(parts[0]), int(parts[1])
            
            # Validate range
            if row < 0 or row > 2 or col < 0 or col > 2:
                print("❌ Invalid position! Row and column must be between 0 and 2.")
                continue
            
            # Check if cell is empty
            if board[row][col] != " ":
                print("❌ That cell is already occupied! Choose another.")
                continue
            
            return row, col
            
        except ValueError:
            print("❌ Invalid input! Please enter numbers only.")


def check_win(board, player):
    """
    Check if the specified player has won.
    Checks all rows, columns, and both diagonals.
    Returns True if player has won, False otherwise.
    """
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True
    
    # Check columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True
    
    # Check main diagonal (top-left to bottom-right)
    if all(board[i][i] == player for i in range(3)):
        return True
    
    # Check anti-diagonal (top-right to bottom-left)
    if all(board[i][2 - i] == player for i in range(3)):
        return True
    
    return False


def check_tie(board):
    """
    Check if the game is a tie (board full, no winner).
    Returns True if tie, False otherwise.
    """
    # Check if any cell is still empty
    for row in board:
        if " " in row:
            return False
    return True


def initialize_board():
    """
    Create and return a new empty 3x3 game board.
    """
    return [[" " for _ in range(3)] for _ in range(3)]


def switch_player(current_player):
    """
    Switch between players X and O.
    """
    return "O" if current_player == "X" else "X"


def play():
    """
    Main game loop.
    Manages game flow: initialization, turns, win/tie checking, and results.
    """
    print("🎮 Welcome to Tic Tac Toe! 🎮")
    print("Players take turns placing X and O on a 3x3 grid.")
    print("First to get 3 in a row (horizontal, vertical, or diagonal) wins!")
    print("Enter moves as: row column (e.g., '1 2' for row 1, column 2)")
    print("Positions are 0-indexed (0, 1, 2 for both row and column)\n")
    
    # Initialize game
    board = initialize_board()
    current_player = "X"  # X always goes first
    
    # Main game loop
    while True:
        # Display current board
        display_board(board)
        
        # Get valid move from current player
        row, col = player_input(board, current_player)
        
        # Update board with player's move
        board[row][col] = current_player
        
        # Check for winner
        if check_win(board, current_player):
            display_board(board)
            print(f"🎉 Congratulations! Player {current_player} wins! 🎉")
            break
        
        # Check for tie
        if check_tie(board):
            display_board(board)
            print("🤝 It's a tie! The board is full with no winner.")
            break
        
        # Switch to next player
        current_player = switch_player(current_player)
    
    # Ask to play again
    print("\n" + "=" * 30)
    play_again = input("Would you like to play again? (yes/no): ").strip().lower()
    if play_again in ['yes', 'y']:
        print("\n" + "=" * 30)
        play()  # Recursive call to start new game
    else:
        print("Thanks for playing! Goodbye! 👋")


# Entry point - start the game when script is run
if __name__ == "__main__":
    play()