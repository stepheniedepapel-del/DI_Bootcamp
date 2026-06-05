import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  visibilityFilter: 'All', // Options: 'All', 'Active', 'Completed'
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setVisibilityFilter: (state, action) => {
      state.visibilityFilter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setVisibilityFilter } = todoSlice.actions;

// Base Input Selectors
const selectAllTodos = (state) => state.todos.items;
export const selectVisibilityFilter = (state) => state.todos.visibilityFilter;

// Memoized Selector: Filters todos based on current visibility filter
export const selectTodos = createSelector(
  [selectAllTodos, selectVisibilityFilter],
  (todos, filter) => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
);

// Memoized Selector: Computes the count of the filtered list
export const selectFilteredTodosCount = createSelector(
  [selectTodos],
  (filteredTodos) => filteredTodos.length
);

export default todoSlice.reducer;
