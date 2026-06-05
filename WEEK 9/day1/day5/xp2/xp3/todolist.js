import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  removeTodo, 
  setVisibilityFilter, 
  selectTodos, 
  selectVisibilityFilter, 
  selectFilteredTodosCount 
} from './todoSlice';

export default function TodoList() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  // Retrieve state using optimized selectors
  const filteredTodos = useSelector(selectTodos);
  const currentFilter = useSelector(selectVisibilityFilter);
  const todoCount = useSelector(selectFilteredTodosCount);

  // Performance Optimization: Memoized action handlers
  const handleToggle = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(removeTodo(id));
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Todo List</h2>
      
      {/* Input Form */}
      <form onSubmit={handleAddTodo}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      {/* Filter Buttons */}
      <div style={{ margin: '15px 0' }}>
        {['All', 'Active', 'Completed'].map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch(setVisibilityFilter(filter))}
            style={{ 
              marginRight: '5px', 
              fontWeight: currentFilter === filter ? 'bold' : 'normal' 
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Todo Item Count */}
      <p><strong>Total Items Shown:</strong> {todoCount}</p>

      {/* Todo List Items */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '8px' }}>
            <span
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleRemove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
