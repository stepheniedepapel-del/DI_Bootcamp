// T must have a 'length' property (string, array, etc.)
function logLength<T extends { length: number }>(input: T): void {
  console.log(`Length: ${input.length}`);
}

logLength("Hello");         // Length: 5
logLength([1, 2, 3, 4]);    // Length: 4
logLength({ length: 10 });  // Length: 10  (any object with .length)

// logLength(42);  ← TypeScript ERROR: number has no .length