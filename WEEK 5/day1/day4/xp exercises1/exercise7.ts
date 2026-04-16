// T must have a toString() method — which nearly everything does
function formatInput<T extends { toString(): string }>(value: T): string {
  // Assert to string so we can safely call string methods
  const str = value.toString() as string;
  return `Formatted: "${str.trim().toUpperCase()}"`;
}

console.log(formatInput(42));           // Formatted: "42"
console.log(formatInput("  hello  "));  // Formatted: "HELLO"
console.log(formatInput(true));         // Formatted: "TRUE"

// The constraint ensures T has toString().
// The assertion tells TS the result is definitely a string.