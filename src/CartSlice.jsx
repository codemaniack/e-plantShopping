import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of cart items
  totalQuantity: 0, // Total number of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1; // Increment total quantity
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += quantityDiff; // Adjust total quantity
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.name === action.payload);
      if (itemIndex >= 0) {
        state.totalQuantity -= state.items[itemIndex].quantity; // Deduct quantity from total
        state.items.splice(itemIndex, 1); // Remove item
      }
    },
  },
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
