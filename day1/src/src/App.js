import React, { Component } from 'react';
import FormComponent from './FormComponent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      destination: '',
      lactoseFree: false,
      nutsFree: false,
      vegan: false
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === 'checkbox' 
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    const params = new URLSearchParams();
    for (const key in this.state) {
      if (this.state[key] === true) {
        params.append(key, 'on');
      } else if (this.state[key] !== false && this.state[key] !== '') {
        params.append(key, this.state[key]);
      }
    }
    
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  render() {
    return (
      <div className="App">
        <h1>Sample Form</h1>
        <FormComponent 
          data={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <hr />
        <div className="output">
          <h2>Entered Information:</h2>
          <p>Your Name: {this.state.firstName} {this.state.lastName}</p>
          <p>Your Age: {this.state.age}</p>
          <p>Your Gender: {this.state.gender}</p>
          <p>Your Destination: {this.state.destination}</p>
          <p>Your Dietary Restrictions:</p>
          <p className="restriction">**Nuts Free: {this.state.nutsFree ? 'Yes' : 'No'}</p>
          <p className="restriction">**Lactose Free: {this.state.lactoseFree ? 'Yes' : 'No'}</p>
          <p className="restriction">**Vegan: {this.state.vegan ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }
}

export default App;