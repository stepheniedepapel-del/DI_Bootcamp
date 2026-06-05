import { createSlice, createSelector } from '@reduxjs/toolkit';

// Initial state containing a mock list of products and an empty cart
const initialState = {
  products: [
    { id: 1, name: 'Wireless Mouse', price: 25.00 },
    { id: 2, name: 'Mechanical Keyboard', price: 85.00 },
    { id: 3, name: 'Gaming Monitor', price: 250.00 },
  ],
  cart: [] // Elements will look like: { id, name, price, quantity }
};

const cartSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

// --- SELECTORS ---

// Base selectors to extract raw state slices
export const selectProducts = (state) => state.shop.products;
export const selectCartItems = (state) => state.shop.cart;

// Memoized selector to compute the total price
// This will ONLY re-calculate if selectCartItems returns a new reference
export const calculateTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => {
    console.log('Calculating total price...'); // Verifies memoization
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
);
