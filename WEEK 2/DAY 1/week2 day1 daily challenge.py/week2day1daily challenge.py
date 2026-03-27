class Farm:
    """
    A class representing a farm with animals.
    """
    
    def __init__(self, farm_name):
        """
        Initialize the farm with a name and empty animals dictionary.
        
        Args:
            farm_name: The name of the farm
        """
        self.name = farm_name
        self.animals = {}
    
    def add_animal(self, animal_type, count=1):
        """
        Add animals to the farm.
        
        Args:
            animal_type: Type of animal (string)
            count: Quantity to add (default 1)
        """
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
    
    def add_animals(self, **kwargs):
        """
        BONUS: Add multiple animals at once using **kwargs.
        
        Example: farm.add_animals(cow=5, sheep=2, goat=12)
        """
        for animal_type, count in kwargs.items():
            self.add_animal(animal_type, count)
    
    def get_info(self):
        """
        Return formatted string with farm info and animal counts.
        
        Returns:
            String with farm name, animals list, and E-I-E-I-0!
        """
        result = f"{self.name}'s farm\n\n"
        
        for animal, count in self.animals.items():
            result += f"{animal} : {count}\n"
        
        result += "\n    E-I-E-I-0!"
        return result
    
    def get_animal_types(self):
        """
        BONUS: Return sorted list of animal types.
        
        Returns:
            Sorted list of animal names (keys from dictionary)
        """
        return sorted(self.animals.keys())
    
    def get_short_info(self):
        """
        BONUS: Return short description of farm with pluralized animals.
        
        Returns:
            String like "McDonald's farm has cows, goats and sheep."
        """
        animal_types = self.get_animal_types()
        
        if not animal_types:
            return f"{self.name}'s farm has no animals."
        
        # Build list of animal names with proper pluralization
        animal_list = []
        for animal in animal_types:
            count = self.animals[animal]
            # Add 's' if count > 1, except for words that already end in 's'
            if count > 1:
                if animal.endswith('s'):
                    animal_name = animal
                else:
                    animal_name = animal + 's'
            else:
                animal_name = animal
            animal_list.append(animal_name)
        
        # Format the final string with proper commas and "and"
        if len(animal_list) == 1:
            animals_str = animal_list[0]
        elif len(animal_list) == 2:
            animals_str = f"{animal_list[0]} and {animal_list[1]}"
        else:
            # Oxford comma style: "cows, goats, and sheep"
            animals_str = ", ".join(animal_list[:-1]) + " and " + animal_list[-1]
        
        return f"{self.name}'s farm has {animals_str}."


# ==================== TESTING ====================

print("=" * 50)
print("TEST 1: Basic Functionality")
print("=" * 50)

macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')        # Default count = 1
macdonald.add_animal('sheep')        # Now sheep = 2
macdonald.add_animal('goat', 12)

print(macdonald.get_info())
print()

print("=" * 50)
print("TEST 2: Bonus - get_animal_types()")
print("=" * 50)
print("Animal types:", macdonald.get_animal_types())
print()

print("=" * 50)
print("TEST 3: Bonus - get_short_info()")
print("=" * 50)
print(macdonald.get_short_info())
print()

print("=" * 50)
print("TEST 4: Bonus - add_animals() with **kwargs")
print("=" * 50)

new_farm = Farm("Green Acres")
new_farm.add_animals(cow=5, sheep=2, goat=12, chicken=8)
print(new_farm.get_info())
print()
print("Short info:", new_farm.get_short_info())
print()

print("=" * 50)
print("TEST 5: Single animal (no plural)")
print("=" * 50)

small_farm = Farm("Tiny Farm")
small_farm.add_animal('horse', 1)
print(small_farm.get_short_info())