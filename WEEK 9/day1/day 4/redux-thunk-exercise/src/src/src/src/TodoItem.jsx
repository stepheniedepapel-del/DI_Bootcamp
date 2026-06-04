import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from './todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      marginBottom: '8px',
      backgroundColor: todo.completed ? '#d4edda' : '#f8f9fa',
      borderRadius: '5px',
      textDecoration: todo.completed ? 'line-through' : 'none',
      opacity: todo.completed ? 0.7 : 1,
    }}>
      <span 
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{ cursor: 'pointer', flex: 1 }}
      >
        {todo.title}
      </span>
      
      <button 
        onClick={() => dispatch(removeTodo(todo.id))}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer',
        }}
      >
        Remove
      </button>
    </li>
  );
};

export default TodoItem;