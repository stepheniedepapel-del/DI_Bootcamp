import React from 'react';

// React.memo skips re-rendering if props (todo, onToggle, onRemove) remain identical
const TodoItem = React.memo(function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li style={{ marginBottom: '8px' }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>Delete</button>
    </li>
  );
});

export default TodoItem;
