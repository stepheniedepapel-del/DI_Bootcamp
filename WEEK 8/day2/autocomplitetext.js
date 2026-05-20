import React, { Component } from 'react';
import countries from './countries';
import './AutoCompletedText.css'; // Optional styling file

class AutoCompletedText extends Component {
  constructor(props) {
    super(props);
    // 2. Component initial state
    this.state = {
      suggestions: [],
      text: ''
    };
  }

  // 3. Triggered when the user enters a new letter
  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i'); // Matches from the start of the string case-insensitively
      suggestions = countries.filter(country => regex.test(country));
    }
    
    this.setState({ suggestions, text: value });
  }

  // 5. Triggered when a list item is clicked
  suggestionSelected(value) {
    this.setState({
      text: value,         // Display selected value in the input
      suggestions: []      // Empty out the suggestions array
    });
  }

  // 4 & 5. Renders the unordered list of suggestions
  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => this.suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="AutoCompletedText">
        {/* Input element showing the updated state text */}
        <input 
          value={text} 
          onChange={this.onTextChanged} 
          type="text" 
          placeholder="Search country..." 
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default AutoCompletedText;
