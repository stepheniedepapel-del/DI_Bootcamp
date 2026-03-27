import random

class Game:
    """
    Handles the Rock Paper Scissors game logic.
    """
    
    def get_user_item(self):
        """
        Ask the user to select rock, paper, or scissors.
        Validates input until a valid choice is made.
        
        Returns:
            str: User's choice ('rock', 'paper', or 'scissors')
        """
        valid_choices = ['rock', 'paper', 'scissors']
        
        while True:
            user_input = input("Enter your choice (rock/paper/scissors): ").strip().lower()
            
            if user_input in valid_choices:
                return user_input
            else:
                print("Invalid choice. Please enter 'rock', 'paper', or 'scissors'.")
    
    def get_computer_item(self):
        """
        Randomly select rock, paper, or scissors for the computer.
        
        Returns:
            str: Computer's choice ('rock', 'paper', or 'scissors')
        """
        return random.choice(['rock', 'paper', 'scissors'])
    
    def get_game_result(self, user_item, computer_item):
        """
        Determine the game result based on Rock Paper Scissors rules.
        
        Args:
            user_item: User's choice
            computer_item: Computer's choice
            
        Returns:
            str: 'win', 'draw', or 'loss'
        """
        # Define winning combinations: key beats value
        winning_combinations = {
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        }
        
        if user_item == computer_item:
            return 'draw'
        elif winning_combinations[user_item] == computer_item:
            return 'win'
        else:
            return 'loss'
    
    def play(self):
        """
        Execute one round of the game.
        Gets user and computer choices, determines result, and displays outcome.
        
        Returns:
            str: 'win', 'draw', or 'loss'
        """
        # Get choices
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        
        # Determine result
        result = self.get_game_result(user_item, computer_item)
        
        # Display outcome
        print(f"\nYou chose: {user_item}")
        print(f"Computer chose: {computer_item}")
        
        if result == 'win':
            print("🎉 You WIN!")
        elif result == 'draw':
            print("🤝 It's a DRAW!")
        else:
            print("😞 You LOSE!")
        
        return result