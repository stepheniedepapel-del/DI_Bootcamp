import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({
        id: Date.now(), // temporary ID
        title: text.trim(),
        completed: false,
      }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo..."
        style={{
          padding: '8px',
          width: '300px',
          marginRight: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;