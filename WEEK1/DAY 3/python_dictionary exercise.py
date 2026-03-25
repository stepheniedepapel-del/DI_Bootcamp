# ============================================
# PYTHON EXERCISES - DICTIONARIES
# ============================================

# ============================================
# 🌟 EXERCISE 1: Converting Lists into Dictionaries
# ============================================

print("=" * 50)
print("EXERCISE 1: Lists to Dictionary")
print("=" * 50)

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Using zip() and dict()
result = dict(zip(keys, values))
print(f"Keys: {keys}")
print(f"Values: {values}")
print(f"Result: {result}")

# Alternative using dictionary comprehension
# result = {keys[i]: values[i] for i in range(len(keys))}


# ============================================
# 🌟 EXERCISE 2: Cinemax #2
# ============================================

print("\n" + "=" * 50)
print("EXERCISE 2: Cinemax Ticket Calculator")
print("=" * 50)

family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

def calculate_ticket_cost(family_dict):
    total_cost = 0
    
    for name, age in family_dict.items():
        if age < 3:
            cost = 0
        elif 3 <= age <= 12:
            cost = 10
        else:
            cost = 15
        
        total_cost += cost
        print(f"{name.capitalize()}: {age} years old - Ticket: ${cost}")
    
    return total_cost

total = calculate_ticket_cost(family)
print(f"\nTotal cost for the family: ${total}")

# BONUS: User input version
print("\n--- BONUS: Custom Family ---")
custom_family = {}
while True:
    name = input("Enter family member name (or 'done' to finish): ")
    if name.lower() == 'done':
        break
    age = int(input(f"Enter {name}'s age: "))
    custom_family[name] = age

if custom_family:
    custom_total = calculate_ticket_cost(custom_family)
    print(f"\nTotal cost for your family: ${custom_total}")


# ============================================
# 🌟 EXERCISE 3: Zara
# ============================================

print("\n" + "=" * 50)
print("EXERCISE 3: Zara Brand Dictionary")
print("=" * 50)

# Create the brand dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": ["blue"],
        "Spain": ["red"],
        "US": ["pink", "green"]
    }
}

print("Original brand dictionary created.")

# 1. Change number_stores to 2
brand["number_stores"] = 2
print(f"\n1. Updated number_stores: {brand['number_stores']}")

# 2. Print sentence about clients
print(f"\n2. Zara clients can find clothes for: {', '.join(brand['type_of_clothes'])}.")

# 3. Add country_creation key
brand["country_creation"] = "Spain"
print(f"\n3. Added country_creation: {brand['country_creation']}")

# 4. Add Desigual to competitors if key exists
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
    print(f"\n4. Updated competitors: {brand['international_competitors']}")

# 5. Delete creation_date
del brand["creation_date"]
print(f"\n5. Deleted creation_date")

# 6. Print last international competitor
print(f"\n6. Last competitor: {brand['international_competitors'][-1]}")

# 7. Print major colors in US
print(f"\n7. US major colors: {brand['major_color']['US']}")

# 8. Print number of keys
print(f"\n8. Number of keys: {len(brand)}")

# 9. Print all keys
print(f"\n9. All keys: {list(brand.keys())}")

# BONUS: Merge dictionaries
print("\n--- BONUS: Merge Dictionaries ---")
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000  # This will overwrite the existing value
}

brand.update(more_on_zara)
print(f"Merged dictionary creation_date: {brand['creation_date']}")
print(f"Merged dictionary number_stores: {brand['number_stores']}")


# ============================================
# 🌟 EXERCISE 4: Disney Characters
# ============================================

print("\n" + "=" * 50)
print("EXERCISE 4: Disney Characters")
print("=" * 50)

users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Character to index
char_to_index = {char: idx for idx, char in enumerate(users)}
print(f"\n1. Character to index: {char_to_index}")

# 2. Index to character
index_to_char = {idx: char for idx, char in enumerate(users)}
print(f"\n2. Index to character: {index_to_char}")

# 3. Sorted alphabetically, character to index
sorted_users = sorted(users)
sorted_char_to_index = {char: idx for idx, char in enumerate(sorted_users)}
print(f"\n3. Sorted (A-Z) character to index: {sorted_char_to_index}")

print("\n" + "=" * 50)
print("ALL EXERCISES COMPLETED!")
print("=" * 50)