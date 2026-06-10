import React from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { UserDashboard } from './components/UserDashboard';

function App() {
  return (
    <main style={{ padding: '20px' }}>
      <RegistrationForm />
      <hr style={{ margin: '40px 0' }} />
      <UserDashboard />
    </main>
  );
}

export default App;
