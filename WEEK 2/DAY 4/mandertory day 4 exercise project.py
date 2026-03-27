import random

def get_words_from_file(file_path):
    try:
        with open(file_path, "r") as file:
            content = file.read()
            words = content.split()
            return words
    except FileNotFoundError:
        print("Error: File not found.")
        return []

def get_random_sentence(length, file_path="words.txt"):
    words = get_words_from_file(file_path)
    if not words:
        return "No words available."
    sentence = [random.choice(words) for _ in range(length)]
    return " ".join(sentence).lower()

def main():
    print("This program generates a random sentence.")
    try:
        length = int(input("Enter sentence length (2-20): "))
        if 2 <= length <= 20:
            print("Generated sentence:", get_random_sentence(length))
        else:
            print("Error: Length must be between 2 and 20.")
    except ValueError:
        print("Error: Please enter a valid integer.")

if __name__ == "__main__":
    main()
    import json

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

def main():
    # Step 1: Load JSON
    data = json.loads(sampleJson)

    # Step 2: Access salary
    salary = data["company"]["employee"]["payable"]["salary"]
    print("Salary:", salary)

    # Step 3: Add birth_date
    data["company"]["employee"]["birth_date"] = "1990-05-15"

    # Step 4: Save to file
    with open("modified.json", "w") as file:
        json.dump(data, file, indent=4)

    print("Modified JSON saved to modified.json")

if __name__ == "__main__":
    main()

