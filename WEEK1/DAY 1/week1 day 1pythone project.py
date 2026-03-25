# ============================================
# PYTHON EXERCISES - ALL IN ONE
# ============================================

print("=" * 50)
print("🌟 EXERCISE 1: Favorite Numbers (Sets)")
print("30" * 50)

my_fav_numbers = {7, 13, 42}
my_fav_numbers.add(99)
my_fav_numbers.add(100)
my_fav_numbers.remove(100)

friend_fav_numbers = {3, 7, 21, 42}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print(f"My favorites: {my_fav_numbers}")
print(f"Friend's favorites: {friend_fav_numbers}")
print(f"Our combined favorites: {our_fav_numbers}")


print("\n" + "=" * 50)
print("🌟 EXERCISE 2: Tuple (Immutability)")
print("=" * 50)

my_tuple = (1, 2, 3)
# my_tuple.append(4)  # ERROR - tuples are immutable!
new_tuple = my_tuple + (4, 5)
print(f"Original: {my_tuple}")
print(f"New tuple: {new_tuple}")
print("Tuples cannot be changed after creation!")


print("\n" + "=" * 50)
print("🌟 EXERCISE 3: List Manipulation")
print("=" * 50)

basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
apple_count = basket.count("Apples")
basket.clear()

print(f"Apples appeared: {apple_count} times")
print(f"Final basket: {basket}")


print("\n" + "=" * 50)
print("🌟 EXERCISE 4: Floats")
print("=" * 50)

sequence = [i / 2 for i in range(3, 11)]
print(f"Sequence: {sequence}")


print("\n" + "=" * 50)
print("🌟 EXERCISE 5: For Loops")
print("=" * 50)

print("All numbers 1-20:")
print(list(range(1, 21)))

print("Numbers at even indices (1,3,5,7...):")
numbers = list(range(1, 21))
print([numbers[i] for i in range(0, len(numbers), 2)])


print("\n" + "=" * 50)
print("🌟 EXERCISE 6: While Loop (Input Validation)")
print("=" * 50)

while True:
    name = input("Enter your name: ")
    if not name.isdigit() and len(name) >= 3:
        print("Thank you!")
        break
    print("Invalid! Need letters only, 3+ characters.")


print("\n" + "=" * 50)
print("🌟 EXERCISE 7: Favorite Fruits")
print("=" * 50)

fruits = input("Enter favorite fruits (space-separated): ").split()
fruit = input("Enter any fruit: ")
print("You chose one of your favorite fruits! Enjoy!" if fruit in fruits else "You chose a new fruit. I hope you enjoy it!")


print("\n" + "=" * 50)
print("🌟 EXERCISE 8: Pizza Toppings")
print("=" * 50)

toppings = []
while True:
    t = input("Enter topping (or 'quit'): ")
    if t == 'quit': break
    toppings.append(t)
    print(f"Adding {t}")
total = 10 + len(toppings) * 2.50
print(f"Toppings: {toppings} | Total: ${total:.2f}")


print("\n" + "=" * 50)
print("🌟 EXERCISE 9: Cinemax Tickets")
print("=" * 50)

# Main
total = 0
while True:
    age = input("Enter age (or 'done'): ")
    if age == 'done': break
    age = int(age)
    cost = 0 if age < 3 else 10 if age <= 12 else 15
    total += cost
    print(f"Age {age}: ${cost}")
print(f"Total: ${total}")

# Bonus: Restricted movie (16-21)
print("\n--- RESTRICTED MOVIE ---")
allowed = []
while True:
    age = input("Enter age (or 'done'): ")
    if age == 'done': break
    age = int(age)
    if 16 <= age <= 21:
        allowed.append(age)
print(f"Allowed attendees: {allowed}")