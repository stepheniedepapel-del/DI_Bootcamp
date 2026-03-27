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
