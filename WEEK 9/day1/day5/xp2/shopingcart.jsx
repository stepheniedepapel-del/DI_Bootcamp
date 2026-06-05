import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, selectProducts, selectCartItems, calculateTotalPrice } from './cartSlice';

export default function ShoppingCart() {
  const dispatch = useDispatch();

  // Retrieve state data using performance-optimized selectors
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(calculateTotalPrice);

  // useCallback ensures this function reference stays the same between renders
  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Storefront</h1>
      
      {/* Products List Section */}
      <h2>Available Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <strong>{product.name}</strong> - ${product.price.toFixed(2)}{' '}
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <hr />

      {/* Cart Summary Section */}
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}
