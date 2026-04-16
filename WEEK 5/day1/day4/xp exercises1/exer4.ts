function getFirstElement(arr: (number | string)[]): string {
  // We assert the element is a string — we take responsibility here
  return arr[0] as string;
}

const mixed = ["apple", 2, "banana"];
const nums  = [1, 2, 3];

console.log(getFirstElement(mixed)); // "apple"
console.log(getFirstElement(nums));  // "1" (number treated as string)

// Note: assertions don't convert values at runtime —
// they only change how TypeScript checks the type.