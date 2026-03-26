

# =========================================================
# EXERCISE 1: CURRENCIES (Dunder Methods)
# =========================================================

class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount
    
    def __str__(self):
        if self.amount == 1:
            return f'{self.amount} {self.currency}'
        return f'{self.amount} {self.currency}s'
    
    def __repr__(self):
        return self.__str__()
    
    def __int__(self):
        return self.amount
    
    def __add__(self, other):
        if isinstance(other, (int, float)):
            return Currency(self.currency, self.amount + other)
        elif isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f'Cannot add between Currency type <{self.currency}> and <{other.currency}>')
            return Currency(self.currency, self.amount + other.amount)
        else:
            raise TypeError(f'Cannot add Currency with {type(other).__name__}')
    
    def __iadd__(self, other):
        if isinstance(other, (int, float)):
            self.amount += other
        elif isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f'Cannot add between Currency type <{self.currency}> and <{other.currency}>')
            self.amount += other.amount
        else:
            raise TypeError(f'Cannot add Currency with {type(other).__name__}')
        return self


# =========================================================
# EXERCISE 2: IMPORT (Module Function)
# =========================================================

def sum_two_numbers(a, b):
    """Sums two numbers and prints the result."""
    result = a + b
    print(f"The sum of {a} and {b} is: {result}")
    return result


# =========================================================
# EXERCISE 3: STRING MODULE (Random String)
# =========================================================

import string
import random

def generate_random_string(length=5):
    """Generate a random string of specified length using uppercase and lowercase letters."""
    letters = string.ascii_letters  # Combines ascii_uppercase and ascii_lowercase
    result = ''
    for _ in range(length):
        result += random.choice(letters)
    return result


# =========================================================
# EXERCISE 4: CURRENT DATE
# =========================================================

from datetime import datetime

def display_current_date():
    """Display the current date."""
    current_date = datetime.now().date()
    print(f"Current date: {current_date}")
    return current_date


# =========================================================
# EXERCISE 5: TIME UNTIL JANUARY 1ST
# =========================================================

def time_until_january_first():
    """Calculate and display time left until January 1st of next year."""
    now = datetime.now()
    # January 1st of next year
    if now.month == 1 and now.day == 1:
        next_january_first = datetime(now.year + 1, 1, 1)
    else:
        next_january_first = datetime(now.year + 1, 1, 1)
    
    time_diff = next_january_first - now
    print(f"Time until January 1st, {next_january_first.year}:")
    print(f"  {time_diff.days} days, {time_diff.seconds // 3600} hours, {(time_diff.seconds % 3600) // 60} minutes")
    return time_diff


# =========================================================
# EXERCISE 6: BIRTHDAY MINUTES
# =========================================================

def calculate_lived_minutes(birthdate_str, date_format="%Y-%m-%d"):
    """
    Calculate how many minutes a person has lived.
    
    Args:
        birthdate_str: Date string in format specified by date_format
        date_format: Format of the birthdate (default: "%Y-%m-%d")
    """
    birthdate = datetime.strptime(birthdate_str, date_format)
    now = datetime.now()
    time_diff = now - birthdate
    minutes_lived = int(time_diff.total_seconds() / 60)
    print(f"You have lived approximately {minutes_lived:,} minutes!")
    return minutes_lived


# =========================================================
# EXERCISE 7: FAKER MODULE
# =========================================================

def create_fake_users(count=5):
    """Create a list of fake users using the faker module."""
    try:
        from faker import Faker
        fake = Faker()
        users = []
        
        for _ in range(count):
            user = {
                'name': fake.name(),
                'address': fake.address(),
                'language_code': fake.language_code()
            }
            users.append(user)
        
        return users
    except ImportError:
        print("Note: Install faker module with: pip install faker")
        # Return sample data if faker not installed
        return [
            {'name': 'John Doe', 'address': '123 Main St', 'language_code': 'en'},
            {'name': 'Jane Smith', 'address': '456 Oak Ave', 'language_code': 'fr'}
        ]


# =========================================================
# RUN ALL EXERCISES
# =========================================================

if __name__ == "__main__":
    print("=" * 60)
    print("EXERCISE 1: CURRENCIES")
    print("=" * 60)
    
    c1 = Currency('dollar', 5)
    c2 = Currency('dollar', 10)
    c3 = Currency('shekel', 1)
    
    print(f"print(c1): {c1}")           # '5 dollars'
    print(f"int(c1): {int(c1)}")       # 5
    print(f"repr(c1): {repr(c1)}")     # '5 dollars'
    print(f"c1 + 5: {c1 + 5}")         # 10 dollars
    print(f"c1 + c2: {c1 + c2}")       # 15 dollars
    print(f"c1 (unchanged): {c1}")     # 5 dollars
    
    c1 += 5
    print(f"c1 += 5: {c1}")            # 10 dollars
    
    c1 += c2
    print(f"c1 += c2: {c1}")           # 20 dollars
    
    # Uncomment to test error:
    # print(c1 + c3)  # TypeError
    
    print("\n" + "=" * 60)
    print("EXERCISE 2: IMPORT")
    print("=" * 60)
    sum_two_numbers(10, 20)
    sum_two_numbers(5, 7)
    
    print("\n" + "=" * 60)
    print("EXERCISE 3: RANDOM STRING")
    print("=" * 60)
    random_str = generate_random_string(5)
    print(f"Random string: {random_str}")
    
    print("\n" + "=" * 60)
    print("EXERCISE 4: CURRENT DATE")
    print("=" * 60)
    display_current_date()
    
    print("\n" + "=" * 60)
    print("EXERCISE 5: TIME UNTIL JANUARY 1ST")
    print("=" * 60)
    time_until_january_first()
    
    print("\n" + "=" * 60)
    print("EXERCISE 6: BIRTHDAY MINUTES")
    print("=" * 60)
    # Example: Person born on January 1, 2000
    calculate_lived_minutes("2000-01-01")
    
    print("\n" + "=" * 60)
    print("EXERCISE 7: FAKER MODULE")
    print("=" * 60)
    users = create_fake_users(3)
    for i, user in enumerate(users, 1):
        print(f"User {i}: {user}")
    
    print("\n" + "=" * 60)
    print("ALL EXERCISES COMPLETED!")
    print("=" * 60)
