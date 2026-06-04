import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTodos } from './todoThunk';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
  const { items, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Fetch todos on component mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Todo List</h1>
      
      <AddTodo />
      
      <button 
        onClick={() => dispatch(fetchTodos())}
        style={{
          marginBottom: '15px',
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Refresh Todos
      </button>

      {loading && <p>Loading todos...</p>}
      
      {error && (
        <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '5px' }}>
          Error: {error}
        </div>
      )}
      
      {!loading && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.length === 0 ? (
            <p>No todos yet. Add one above!</p>
          ) : (
            items.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TodoList;