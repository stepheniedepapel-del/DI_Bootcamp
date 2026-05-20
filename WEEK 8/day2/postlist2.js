import React, { Component } from 'react';

class PostList extends Component {
  constructor(props) {
    super(props);
    // Part I: Initializing state properties
    this.state = {
      posts: [],
      errorMsg: ''
    };
  }

  // Part I: Fetching data on component mount
  async componentDidMount() {
    try {
      const response = await fetch('typicode.com');
      if (!response.ok) {
        throw new Error('Failed to fetch posts data');
      }
      const data = await response.json();
      this.setState({ posts: data });
    } catch (error) {
      this.setState({ errorMsg: error.message });
    }
  }

  render() {
    // Part I: Destructuring state properties
    const { posts, errorMsg } = this.state;

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>List of Posts</h2>
        
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        {/* Part I & III: Map over posts array only if it is not empty */}
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <h4 style={{ color: '#333', textTransform: 'capitalize' }}>{post.title}</h4>
              <p style={{ color: '#666' }}>{post.body}</p>
            </div>
          ))
        ) : (
          !errorMsg && <div>Loading posts...</div>
        )}
      </div>
    );
  }
}

export default PostList;
