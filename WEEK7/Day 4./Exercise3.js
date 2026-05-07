import React, { Component } from 'react';
import './Exercise.css';

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

class Exercise extends Component {
  render() {
    return (
      <div>
        {/* Inline Style from Part 1 & Object Style from Part 2 */}
        <h1 style={style_header}>This is a Header</h1>
        
        <p className="para">This is a paragraph</p>
        <a href="https://reactjs.org">This is a link</a>
        
        <form>
          <input type="text" placeholder="Type something..." />
          <button type="submit">Submit</button>
        </form>

        <img src="https://clearbit.com" alt="react logo" />

        <ul>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
