from anagram_checker import AnagramChecker

def get_single_word_input():
    user_input = input("\nEnter a word (or 'exit' to quit): ").strip()
    if user_input.lower() == 'exit':
        return None
    words = user_input.split()
    if len(words) > 1:
        print("Error: Please enter only a single word.")
        return False
    if not user_input:
        print("Error: Input cannot be empty.")
        return False
    if not user_input.isalpha():
        print("Error: Only alphabetic characters allowed.")
        return False
    return user_input

def display_results(word, checker):
    print(f'\nYOUR WORD: "{word.upper()}"')
    if checker.is_valid_word(word):
        print("This is a valid English word.")
    else:
        print("This is NOT a valid English word.")
    anagrams = checker.get_anagrams(word)
    if anagrams:
        print(f'Anagrams: {", ".join(sorted(anagrams))}.')
    else:
        print("No anagrams found.")

def main():
    print("Welcome to Anagram Checker!")
    try:
        checker = AnagramChecker('word_list.txt')
    except FileNotFoundError as e:
        print(e)
        return
    
    while True:
        print("\n--- MENU ---")
        print("1. Check a word")
        print("2. Exit")
        choice = input("Select: ").strip()
        
        if choice == '2':
            print("Goodbye!")
            break
        elif choice == '1':
            word = get_single_word_input()
            if word is None:
                print("Goodbye!")
                break
            elif word:
                display_results(word, checker)
        else:
            print("Invalid option.")

if __name__ == "__main__":
    main()