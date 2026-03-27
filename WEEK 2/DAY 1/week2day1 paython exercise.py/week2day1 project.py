# ============================================
# PYTHON CLASSES AND OBJECTS - ALL EXERCISES
# ============================================

# ============================================
# 🌟 EXERCISE 1: CATS
# ============================================

class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Step 1: Create cat objects
cat1 = Cat("Whiskers", 3)
cat2 = Cat("Mittens", 7)
cat3 = Cat("Shadow", 5)

# Step 2: Create a function to find the oldest cat
def find_oldest_cat(cat1, cat2, cat3):
    oldest = cat1  # Assume first cat is oldest initially
    
    if cat2.age > oldest.age:
        oldest = cat2
    if cat3.age > oldest.age:
        oldest = cat3
    
    return oldest

# Step 3: Print the oldest cat's details
oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print("=" * 40)
print("🐱 EXERCISE 1: CATS")
print("=" * 40)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")
print()


# ============================================
# 🌟 EXERCISE 2: DOGS
# ============================================

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    
    def bark(self):
        print(f"{self.name} goes woof!")
    
    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")

print("=" * 40)
print("🐕 EXERCISE 2: DOGS")
print("=" * 40)

# Step 2: Create dog objects
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

# Step 3: Print details and call methods
print("\n--- David's Dog ---")
print(f"Name: {davids_dog.name}, Height: {davids_dog.height}cm")
davids_dog.bark()
davids_dog.jump()

print("\n--- Sarah's Dog ---")
print(f"Name: {sarahs_dog.name}, Height: {sarahs_dog.height}cm")
sarahs_dog.bark()
sarahs_dog.jump()

# Step 4: Compare dog sizes
print("\n--- Size Comparison ---")
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is bigger!")
elif sarahs_dog.height > davids_dog.height:
    print(f"{sarahs_dog.name} is bigger!")
else:
    print("Both dogs are the same size!")
print()


# ============================================
# 🌟 EXERCISE 3: WHO'S THE SONG PRODUCER?
# ============================================

class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics
    
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

print("=" * 40)
print("🎵 EXERCISE 3: SONG")
print("=" * 40)

stairway = Song([
    "There's a lady who's sure",
    "all that glitters is gold",
    "and she's buying a stairway to heaven"
])

stairway.sing_me_a_song()
print()


# ============================================
# 🌟 EXERCISE 4: AFTERNOON AT THE ZOO
# ============================================

class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
    
    def add_animal(self, new_animal):
        """Add a new animal if not already in the list"""
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"✅ Added {new_animal}")
        else:
            print(f"⚠️ {new_animal} is already in the zoo!")
    
    def get_animals(self):
        """Print all animals in the zoo"""
        print(f"\n🦁 Animals in {self.name}:")
        if not self.animals:
            print("   (No animals yet)")
        else:
            for animal in self.animals:
                print(f"   • {animal}")
    
    def sell_animal(self, animal_sold):
        """Remove an animal from the zoo"""
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"💰 Sold {animal_sold}")
        else:
            print(f"❌ {animal_sold} not found in the zoo!")
    
    def sort_animals(self):
        """Sort animals alphabetically and group by first letter"""
        self.animals.sort()  # Sort alphabetically
        
        grouped = {}
        for animal in self.animals:
            first_letter = animal[0].upper()  # Get first letter, uppercase
            if first_letter not in grouped:
                grouped[first_letter] = []
            grouped[first_letter].append(animal)
        
        return grouped
    
    def get_groups(self):
        """Print animals grouped by first letter"""
        grouped = self.sort_animals()
        print(f"\n📊 Animal Groups in {self.name}:")
        for letter in sorted(grouped.keys()):
            print(f"   {letter}: {grouped[letter]}")

print("=" * 40)
print("🦒 EXERCISE 4: ZOO")
print("=" * 40)

# Step 2: Create a Zoo instance
brooklyn_safari = Zoo("Brooklyn Safari")

# Step 3: Use the Zoo methods
brooklyn_safari.add_animal("Giraffe")
brooklyn_safari.add_animal("Bear")
brooklyn_safari.add_animal("Baboon")
brooklyn_safari.add_animal("Giraffe")  # Duplicate - won't be added

brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()

# Add more animals for better grouping demo
brooklyn_safari.add_animal("Cat")
brooklyn_safari.add_animal("Cougar")
brooklyn_safari.add_animal("Lion")
brooklyn_safaribrooklyn_safari.add_animal("Zebra")
brooklyn_safari.animals.add_animal("Alligator")  # Directly adding to test sorting
brooklyn_safari.get_groups()

print("\n" + "=" * 40)
print("🎉 ALL EXERCISES COMPLETED!")
print("=" * 40)