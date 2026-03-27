"""
==========================================
PYTHON OOP EXERCISES - COMPLETE SOLUTION
==========================================
Exercise 1: Geometry (Circle Class)
Exercise 2: Custom List Class
Exercise 3: Restaurant Menu Manager
==========================================
"""

import math
import random


# ==========================================
# EXERCISE 1: CIRCLE CLASS
# ==========================================

class Circle:
    """A class representing a circle with radius and geometric calculations."""
    
    def __init__(self, radius=1.0):
        """Initialize circle with a radius (default is 1.0)."""
        self.radius = radius
    
    def perimeter(self):
        """Calculate and return the perimeter (circumference) of the circle."""
        return 2 * math.pi * self.radius
    
    def area(self):
        """Calculate and return the area of the circle."""
        return math.pi * (self.radius ** 2)
    
    def definition(self):
        """Print the geometrical definition of a circle."""
        print("A circle is a round plane figure whose boundary (the circumference) consists of points equidistant from a fixed center point.")


# ==========================================
# EXERCISE 2: CUSTOM LIST CLASS
# ==========================================

class MyList:
    """A custom list class with various list manipulation methods."""
    
    def __init__(self, letters_list):
        """Initialize with a list of letters."""
        self.letters = letters_list
    
    def reverse_list(self):
        """Return the reversed list."""
        return self.letters[::-1]
    
    def sort_list(self):
        """Return the sorted list."""
        return sorted(self.letters)
    
    def generate_random_list(self):
        """Bonus: Generate a second list with random numbers of the same length."""
        return [random.randint(1, 100) for _ in range(len(self.letters))]


# ==========================================
# EXERCISE 3: RESTAURANT MENU MANAGER
# ==========================================

class MenuManager:
    """A class to manage a restaurant menu with dishes."""
    
    def __init__(self):
        """Initialize the menu with default dishes."""
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]
    
    def display_menu(self):
        """Display the current menu in a formatted way."""
        print("\n" + "=" * 60)
        print("CURRENT MENU")
        print("=" * 60)
        print(f"{'Name':<20} {'Price':<10} {'Spice':<10} {'Gluten':<10}")
        print("-" * 60)
        for dish in self.menu:
            gluten_status = "Yes" if dish["gluten"] else "No"
            print(f"{dish['name']:<20} {dish['price']:<10} {dish['spice']:<10} {gluten_status:<10}")
        print("=" * 60)
    
    def add_item(self, name, price, spice, gluten):
        """Add a new dish to the menu."""
        new_dish = {
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten
        }
        self.menu.append(new_dish)
        print(f"\n✓ '{name}' has been added to the menu.")
    
    def update_item(self, name, price, spice, gluten):
        """Update an existing dish in the menu."""
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish["price"] = price
                dish["spice"] = spice
                dish["gluten"] = gluten
                print(f"\n✓ '{name}' has been updated.")
                return
        print(f"\n✗ Error: '{name}' is not in the menu. Cannot update.")
    
    def remove_item(self, name):
        """Remove a dish from the menu."""
        for i, dish in enumerate(self.menu):
            if dish["name"].lower() == name.lower():
                removed_dish = self.menu.pop(i)
                print(f"\n✓ '{removed_dish['name']}' has been removed from the menu.")
                print("\nUpdated menu:")
                self.display_menu()
                return
        print(f"\n✗ Error: '{name}' is not in the menu. Cannot remove.")


# ==========================================
# DEMONSTRATION / TESTING
# ==========================================

if __name__ == "__main__":
    
    print("=" * 60)
    print("EXERCISE 1: CIRCLE CLASS")
    print("=" * 60)
    
    # Test with default radius
    circle1 = Circle()
    print(f"\nCircle 1 (default radius = {circle1.radius}):")
    print(f"Perimeter: {circle1.perimeter():.2f}")
    print(f"Area: {circle1.area():.2f}")
    circle1.definition()
    
    # Test with custom radius
    circle2 = Circle(5.0)
    print(f"\nCircle 2 (radius = {circle2.radius}):")
    print(f"Perimeter: {circle2.perimeter():.2f}")
    print(f"Area: {circle2.area():.2f}")
    circle2.definition()
    
    print("\n" + "=" * 60)
    print("EXERCISE 2: CUSTOM LIST CLASS")
    print("=" * 60)
    
    # Create a MyList instance
    my_letters = MyList(['d', 'a', 'c', 'b', 'e'])
    print(f"\nOriginal list: {my_letters.letters}")
    print(f"Reversed list: {my_letters.reverse_list()}")
    print(f"Sorted list: {my_letters.sort_list()}")
    print(f"Random numbers list: {my_letters.generate_random_list()}")
    
    print("\n" + "=" * 60)
    print("EXERCISE 3: RESTAURANT MENU MANAGER")
    print("=" * 60)
    
    # Create menu manager instance
    menu = MenuManager()
    
    # Display initial menu
    menu.display_menu()
    
    # Test add_item
    print("\n--- Testing add_item ---")
    menu.add_item("Pizza", 20, "B", True)
    menu.add_item("Ice Cream", 8, "A", False)
    menu.display_menu()
    
    # Test update_item
    print("\n--- Testing update_item ---")
    menu.update_item("Salad", 20, "A", False)
    menu.update_item("Pasta", 22, "B", True)
    menu.display_menu()
    
    # Test remove_item
    print("\n--- Testing remove_item ---")
    menu.remove_item("French Fries")
    menu.remove_item("Sushi")