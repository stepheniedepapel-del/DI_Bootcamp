import { setLoading, setError, setTodos } from './todoSlice';

// Fetch todos from JSONPlaceholder API
export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      dispatch(setTodos(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};