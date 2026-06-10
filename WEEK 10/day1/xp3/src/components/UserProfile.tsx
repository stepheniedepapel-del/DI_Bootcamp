import React, { useReducer } from 'react';

// 1. Define State and Action Types
interface Profile {
  name: string;
  bio: string;
}

type ProfileStatus = 'initial' | 'loading' | 'success' | 'error';

interface ProfileState {
  status: ProfileStatus;
  profile: Profile | null;
  error: string | null;
}

type ProfileAction =
  | { type: 'SET_LOADING' }
  | { type: 'UPDATE_SUCCESS'; payload: Profile }
  | { type: 'UPDATE_FAILURE'; payload: string };

// 2. Set Up Initial State
const initialState: ProfileState = {
  status: 'initial',
  profile: null,
  error: null,
};

// 3. Create the Reducer Function
function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading', error: null };
    case 'UPDATE_SUCCESS':
      return { ...state, status: 'success', profile: action.payload, error: null };
    case 'UPDATE_FAILURE':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}

// 4. Use the Reducer in a Component
export const UserProfile: React.FC = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const handleUpdateProfile = () => {
    dispatch({ type: 'SET_LOADING' });

    // Simulate an API network request trigger
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.3; // 70% chance of success
      if (isSuccessful) {
        dispatch({
          type: 'UPDATE_SUCCESS',
          payload: { name: 'Jane Doe', bio: 'Senior Frontend Engineer & TypeScript enthusiast.' },
        });
      } else {
        dispatch({ type: 'UPDATE_FAILURE', payload: 'Network timed out. Please try again.' });
      }
    }, 1500);
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '6px', maxWidth: '400px' }}>
      <h2>User Profile Status</h2>
      <p>Current Status: <strong>{state.status}</strong></p>

      {state.status === 'loading' && <p>Saving updates to cloud server...</p>}
      {state.status === 'error' && <p style={{ color: 'red' }}>Error: {state.error}</p>}
      
      {state.profile && (
        <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
          <h4>{state.profile.name}</h4>
          <p>{state.profile.bio}</p>
        </div>
      )}

      <button 
        onClick={handleUpdateProfile} 
        disabled={state.status === 'loading'}
        style={{ marginTop: '12px', padding: '8px 16px', cursor: 'pointer' }}
      >
        Simulate Profile Update
      </button>
    </div>
  );
};
