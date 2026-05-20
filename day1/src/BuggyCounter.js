import React, { Component } from 'react';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(prevState => {
      const newCounter = prevState.counter + 1;
      if (newCounter === 5) {
        throw new Error('I crashed!');
      }
      return { counter: newCounter };
    });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.state.counter}
      </div>
    );
  }
}