import React from 'react';
import PostList from './PostList';
import UsersList from './UsersList';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10px' }}>
      <h1 style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        API Data Fetching Challenge
      </h1>
      
      {/* Render Users List Section */}
      <section style={{ marginBottom: '40px' }}>
        <UsersList />
      </section>
      
      <hr />

      {/* Render Posts List Section */}
      <section style={{ marginTop: '40px' }}>
        <PostList />
      </section>
    </div>
  );
}

export default App;
