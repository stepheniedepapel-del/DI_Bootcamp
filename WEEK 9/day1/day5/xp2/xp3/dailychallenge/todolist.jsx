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
import TodoItem from './TodoItem'; // Import our optimized item

export default function TodoList() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectTodos);
  const currentFilter = useSelector(selectVisibilityFilter);
  const todoCount = useSelector(selectFilteredTodosCount);

  // Stable references ensure React.memo handles comparison successfully
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
      
      <form onSubmit={handleAddTodo}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

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

      <p><strong>Total Items Shown:</strong> {todoCount}</p>

      <ul>
        {filteredTodos.map((todo) => (
          // Renders optimized children without redundant layout calculations
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggle} 
            onRemove={handleRemove} 
          />
        ))}
      </ul>
    </div>
  );
}
