class AnagramChecker:
    def __init__(self, word_list_file='word_list.txt'):
        self.word_set = set()
        try:
            with open(word_list_file, 'r') as file:
                for line in file:
                    word = line.strip().lower()
                    if word:
                        self.word_set.add(word)
        except FileNotFoundError:
            raise FileNotFoundError(f"Word list file '{word_list_file}' not found")

    def is_valid_word(self, word):
        return word.lower() in self.word_set

    def is_anagram(self, word1, word2):
        return sorted(word1.lower()) == sorted(word2.lower())

    def get_anagrams(self, word):
        anagrams = []
        target_lower = word.lower()
        for dict_word in self.word_set:
            if self.is_anagram(target_lower, dict_word) and dict_word != target_lower:
                anagrams.append(dict_word)
        return anagrams