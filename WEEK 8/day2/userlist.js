import React, { Component } from 'react';

class UsersList extends Component {
  constructor(props) {
    super(props);
    // Part II: State initialization with boolean checker
    this.state = {
      users: [],
      isLoaded: false
    };
  }

  // Part II: Fetching data from the USERS URL
  async componentDidMount() {
    try {
      const response = await fetch('typicode.com');
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      const data = await response.json();
      this.setState({ 
        users: data, 
        isLoaded: true // Set to true after data finishes loading
      });
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  render() {
    // Part II: Destructuring state properties
    const { users, isLoaded } = this.state;

    // Part II: Conditional return if items are NOT loaded yet
    if (!isLoaded) {
      return <div style={{ padding: '20px', fontWeight: 'bold' }}>Loading...</div>;
    }

    // Part II & III: Render structured data when loaded
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>List of Users</h2>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
          {users.map(user => (
            <li key={user.id} style={{ marginBottom: '10px' }}>
              <strong>{user.name}</strong> — <span style={{ color: '#0066cc' }}>{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UsersList;
