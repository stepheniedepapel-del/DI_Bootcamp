import React, { Component } from "react";
import FormComponent from "./FormComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      isDietary: {
        isVegan: false,
        isLactoseFree: false,
        isNutFree: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    
    // Ternary operator to distinguish between checkbox and other inputs
    type === "checkbox"
      ? this.setState(prevState => ({
          isDietary: {
            ...prevState.isDietary,
            [name]: checked
          }
        }))
      : this.setState({ [name]: value });
  }

  render() {
    return (
      <FormComponent 
        handleChange={this.handleChange} 
        data={this.state} 
      />
    );
  }
}

export default App;
