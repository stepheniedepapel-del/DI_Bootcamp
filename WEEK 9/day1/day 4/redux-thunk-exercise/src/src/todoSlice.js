import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setTodos: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setLoading, setError, setTodos, addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;