"""
Python OOP Exercises - All in One
Topics: Inheritance, Class methods, Polymorphism, Exceptions, super()
"""

import random


# ==========================================
# EXERCISE 1: PETS
# ==========================================

class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'


class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Siamese(Cat):
    pass


# ==========================================
# EXERCISE 2: DOGS
# ==========================================

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        
        if my_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"It's a tie between {self.name} and {other_dog.name}"


# ==========================================
# EXERCISE 3: DOGS DOMESTICATED
# ==========================================

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        dog_names = [self.name]
        for dog in args:
            dog_names.append(dog.name)
        print(f"{', '.join(dog_names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", 
                     "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} is not trained yet!")


# ==========================================
# EXERCISE 4: FAMILY AND PERSON
# ==========================================

class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18


class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)
        print(f"Congratulations! {first_name} {self.last_name} was born!")

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(f"You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print(f"Sorry, you are not allowed to go out with your friends.")
                return
        print(f"Person {first_name} not found in family.")

    def family_presentation(self):
        print(f"Family Name: {self.last_name}")
        print("Members:")
        for member in self.members:
            print(f"  - {member.first_name} {member.last_name}, {member.age} years old")


# ==========================================
# TESTING ALL EXERCISES
# ==========================================

if __name__ == "__main__":
    
    print("=" * 50)
    print("EXERCISE 1: PETS")
    print("=" * 50)
    
    bengal_obj = Bengal("Leo", 3)
    chartreux_obj = Chartreux("Milo", 5)
    siamese_obj = Siamese("Luna", 2)
    all_cats = [bengal_obj, chartreux_obj, siamese_obj]
    sara_pets = Pets(all_cats)
    sara_pets.walk()
    
    print("\n" + "=" * 50)
    print("EXERCISE 2: DOGS")
    print("=" * 50)
    
    dog1 = Dog("Rex", 5, 30)
    dog2 = Dog("Buddy", 3, 20)
    dog3 = Dog("Max", 4, 25)
    
    print(dog1.bark())
    print(f"{dog2.name}'s run speed: {dog2.run_speed():.2f}")
    print(dog1.fight(dog2))
    
    print("\n" + "=" * 50)
    print("EXERCISE 3: DOGS DOMESTICATED")
    print("=" * 50)
    
    my_dog = PetDog("Fido", 2, 10)
    buddy = PetDog("Buddy", 3, 15)
    max_dog = PetDog("Max", 4, 20)
    
    my_dog.train()
    my_dog.play(buddy, max_dog)
    my_dog.do_a_trick()
    buddy.do_a_trick()
    
    print("\n" + "=" * 50)
    print("EXERCISE 4: FAMILY")
    print("=" * 50)
    
    smith_family = Family("Smith")
    smith_family.born("Alice", 20)
    smith_family.born("Bob", 16)
    smith_family.born("Charlie", 5)
    
    smith_family.check_majority("Alice")
    smith_family.check_majority("Bob")
    smith_family.family_presentation()