import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from './userSlice';

export const fetchUserData = (userId = 1) => {
  return async (dispatch) => {
    dispatch(fetchUserStart());
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      dispatch(fetchUserSuccess(data));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};