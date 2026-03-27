import random


class Card:
    """Represents a single playing card with suit and value."""
    
    SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    
    def __init__(self, suit: str, value: str):
        if suit not in self.SUITS:
            raise ValueError(f"Invalid suit: {suit}. Must be one of {self.SUITS}")
        if value not in self.VALUES:
            raise ValueError(f"Invalid value: {value}. Must be one of {self.VALUES}")
        
        self.suit = suit
        self.value = value
    
    def __repr__(self) -> str:
        return f"{self.value} of {self.suit}"
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, Card):
            return False
        return self.suit == other.suit and self.value == other.value


class Deck:
    """Represents a deck of 52 playing cards."""
    
    def __init__(self):
        self._cards: list[Card] = []
        self._initialize_deck()
    
    def _initialize_deck(self) -> None:
        """Creates a fresh deck of 52 cards."""
        self._cards = [
            Card(suit, value) 
            for suit in Card.SUITS 
            for value in Card.VALUES
        ]
    
    def shuffle(self) -> None:
        """
        Resets the deck to 52 cards and shuffles them randomly.
        Uses random.shuffle() for in-place shuffling.
        """
        self._initialize_deck()
        random.shuffle(self._cards)
    
    def deal(self) -> Card:
        """
        Deals a single card from the top of the deck.
        Removes and returns the card.
        
        Raises:
            IndexError: If the deck is empty
        """
        if not self._cards:
            raise IndexError("Cannot deal from an empty deck. Please shuffle first.")
        
        return self._cards.pop()
    
    def __len__(self) -> int:
        """Returns the number of cards remaining in the deck."""
        return len(self._cards)
    
    def __repr__(self) -> str:
        return f"Deck({len(self._cards)} cards remaining)"


# ============== DEMONSTRATION ==============

if __name__ == "__main__":
    # Create a new deck
    deck = Deck()
    print(f"New deck created: {deck}")
    print(f"Initial deck size: {len(deck)}")
    
    # Shuffle the deck
    print("\n--- Shuffling ---")
    deck.shuffle()
    print("Deck shuffled!")
    
    # Deal some cards
    print("\n--- Dealing 5 cards ---")
    for i in range(5):
        card = deck.deal()
        print(f"Dealt: {card}")
    
    print(f"\nCards remaining: {len(deck)}")
    
    # Deal remaining cards
    print("\n--- Dealing remaining cards ---")
    while len(deck) > 0:
        deck.deal()
    
    print(f"Deck empty: {len(deck)} cards")
    
    # Try to deal from empty deck (will raise error)
    try:
        deck.deal()
    except IndexError as e:
        print(f"\nError caught: {e}")
    
    # Reshuffle to continue
    print("\n--- Reshuffling ---")
    deck.shuffle()
    print(f"After reshuffle: {deck}")
    print(f"Top card: {deck.deal()}")