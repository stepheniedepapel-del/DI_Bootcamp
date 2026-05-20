import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloMessage: '',    // Stores the GET request message
      inputValue: '',      // Tracks current user text input
      responseMessage: ''  // Stores the POST response string from server
    };
  }

  // Part I: Fetch GET route data when component mounts
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/api/hello');
      const data = await response.text();
      this.setState({ helloMessage: data });
    } catch (error) {
      console.error('Error fetching data from GET /api/hello:', error);
    }
  }

  // Handle typing inside the input field
  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  // Part II: Submit input data via POST request
  handleSubmit = async (event) => {
    event.preventDefault(); // Stops the browser from refreshing the full page
    
    try {
      const response = await fetch('http://localhost:5000/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: this.state.inputValue }),
      });
      
      const textResult = await response.text();
      this.setState({ responseMessage: textResult });
    } catch (error) {
      console.error('Error sending data to POST /api/world:', error);
    }
  };

  render() {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {/* Part I Header Output */}
        <h1>{this.state.helloMessage || 'Loading message...'}</h1>

        {/* Part II Form Implementation */}
        <form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
          <p><strong>Post to Express:</strong></p>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Type something..."
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 15px' }}>Submit</button>
        </form>

        {/* Part II Response Display underneath input field */}
        {this.state.responseMessage && (
          <p style={{ marginTop: '15px', color: 'blue' }}>
            {this.state.responseMessage}
          </p>
        )}
      </div>
    );
  }
}

export default App;
