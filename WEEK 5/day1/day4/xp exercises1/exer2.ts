function describeValue(value: number | string): string {
  // typeof narrows the union inside each branch
  if (typeof value === "number") {
    return "This is a number";
  }
  return "This is a string";
}

console.log(describeValue(42));       // "This is a number"
console.log(describeValue("hello"));  // "This is a string"