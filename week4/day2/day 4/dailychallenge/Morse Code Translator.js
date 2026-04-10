const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

// Function 1: Convert JSON string to JS object
function toJs() {
  return new Promise((resolve, reject) => {
    try {
      const morseJS = JSON.parse(morse);
      
      // Check if object is empty
      if (Object.keys(morseJS).length === 0) {
        reject('Error: Morse object is empty');
      } else {
        resolve(morseJS);
      }
    } catch (error) {
      reject('Error: Invalid JSON format');
    }
  });
}

// Function 2: Convert user input to morse code
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    // Get user input
    const userInput = prompt("Enter a word or sentence to translate to Morse code:");
    
    if (!userInput) {
      reject('Error: No input provided');
      return;
    }
    
    const morseTranslation = [];
    const lowerInput = userInput.toLowerCase();
    
    // Check each character
    for (let char of lowerInput) {
      if (char === ' ') {
        // Skip spaces or you can handle them differently
        continue;
      }
      
      if (morseJS[char]) {
        morseTranslation.push(morseJS[char]);
      } else {
        reject(`Error: Character "${char}" not found in Morse code dictionary`);
        return;
      }
    }
    
    resolve(morseTranslation);
  });
}

// Function 3: Display morse translation on page
function joinWords(morseTranslation) {
  // Join with line breaks
  const result = morseTranslation.join('\n');
  
  // Display on DOM
  const outputDiv = document.createElement('div');
  outputDiv.style.fontFamily = 'monospace';
  outputDiv.style.fontSize = '20px';
  outputDiv.style.whiteSpace = 'pre-line';
  outputDiv.style.padding = '20px';
  outputDiv.style.backgroundColor = '#f0f0f0';
  outputDiv.style.margin = '20px';
  outputDiv.textContent = result;
  
  document.body.appendChild(outputDiv);
  
  return result;
}

// Chain the three functions
console.log("Starting Morse Code Translator...");

toJs()
  .then(morseJS => {
    console.log("Morse JS object loaded successfully");
    return toMorse(morseJS);
  })
  .then(morseTranslation => {
    console.log("Translation successful:", morseTranslation);
    joinWords(morseTranslation);
  })
  .catch(error => {
    console.error(error);
    // Display error on page too
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '20px';
    errorDiv.textContent = error;
    document.body.appendChild(errorDiv);
  });