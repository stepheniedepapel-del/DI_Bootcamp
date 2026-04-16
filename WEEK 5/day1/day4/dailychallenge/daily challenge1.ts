// types.ts
type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

// Union type for all possible data types
type DataItem = User | Product | Order;

// ============================================
// TYPE GUARD FUNCTIONS
// ============================================

// Type guard for User
function isUser(item: DataItem): item is User {
  return item.type === 'user';
}

// Type guard for Product
function isProduct(item: DataItem): item is Product {
  return item.type === 'product';
}

// Type guard for Order
function isOrder(item: DataItem): item is Order {
  return item.type === 'order';
}

// ============================================
// MAIN HANDLER FUNCTION
// ============================================

function handleData(data: DataItem[]): string[] {
  return data.map((item) => {
    // Handle User type
    if (isUser(item)) {
      return `Hello, ${item.name}! You are ${item.age} years old.`;
    }
    
    // Handle Product type
    if (isProduct(item)) {
      return `Product #${item.id} costs $${item.price.toFixed(2)}.`;
    }
    
    // Handle Order type
    if (isOrder(item)) {
      return `Order ${item.orderId}: Total amount is $${item.amount.toFixed(2)}.`;
    }
    
    // Graceful handling of unexpected cases
    return `Unknown item type: ${JSON.stringify(item)}`;
  });
}

// ============================================
// TEST CASES
// ============================================

const testData: DataItem[] = [
  { type: 'user', name: 'Alice', age: 28 },
  { type: 'product', id: 101, price: 29.99 },
  { type: 'order', orderId: 'ORD-001', amount: 150.5 },
  { type: 'user', name: 'Bob', age: 35 },
  { type: 'product', id: 102, price: 49.99 },
  { type: 'order', orderId: 'ORD-002', amount: 299.99 },
];

// Run the function
const results = handleData(testData);

// Display results
console.log("=== Daily Challenge: Type Guard with Union Types ===\n");
results.forEach((result, index) => {
  console.log(`${index + 1}. ${result}`);
});

// Test with empty array
console.log("\n=== Empty Array Test ===");
console.log(handleData([])); // []

// Test with unexpected type (if we bypass TypeScript)
console.log("\n=== Unexpected Type Test ===");
const mixedData = [
  ...testData,
  { type: 'unknown', weird: true } as any
];
console.log(handleData(mixedData));