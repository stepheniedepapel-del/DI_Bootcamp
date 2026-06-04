import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from './userThunk';
import { clearUser } from './userSlice';

const UserData = () => {
  const { data, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('1');

  const handleFetch = () => {
    dispatch(fetchUserData(userId));
  };

  const handleClear = () => {
    dispatch(clearUser());
    setUserId('1');
  };

  const handleSimulateError = () => {
    dispatch(fetchUserData(99999));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>User Data Fetcher</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>User ID: </label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          min="1"
          max="10"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch User'}
        </button>
        <button onClick={handleClear} style={{ marginLeft: '10px' }}>
          Clear
        </button>
        <button onClick={handleSimulateError} style={{ marginLeft: '10px', backgroundColor: '#ff6b6b', color: 'white' }}>
          Simulate Error
        </button>
      </div>

      {loading && <p>Loading user data...</p>}

      {error && (
        <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && !loading && !error && (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>User Information</h3>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Username:</strong> {data.username}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Website:</strong> {data.website}</p>
          
          <h4>Address:</h4>
          <p>{data.address?.street}, {data.address?.suite}</p>
          <p>{data.address?.city}, {data.address?.zipcode}</p>
          
          <h4>Company:</h4>
          <p>{data.company?.name}</p>
          <p><em>"{data.company?.catchPhrase}"</em></p>
        </div>
      )}

      {!data && !loading && !error && (
        <p style={{ color: '#666' }}>No user data loaded. Enter a User ID and click "Fetch User".</p>
      )}
    </div>
  );
};

export default UserData;