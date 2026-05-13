import React, { Component } from 'react';
import './Exercise.css';

class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/* PART I & II: Styled Header */}
        <h1 style={style_header}>Exercise 3 Header</h1>

        {/* PART III: Styled Paragraph */}
        <p className="para">This is a styled paragraph from Exercise 3.</p>

        <a href="https://reactjs.org">Click here for React Docs</a>

        <form>
          <input type="text" placeholder="Enter something..." />
          <button type="submit">Submit</button>
        </form>

        <img src="https://clearbit.com" alt="React Logo" width="100" />

        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
