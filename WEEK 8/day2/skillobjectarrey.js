import React, { Component } from "react";
import data from "./complexData.json";

class Example2 extends Component {
  render() {
    return (
      <div className="m-3">
        <h3>Skills</h3>
        {Object.keys(data.Skills).map((category, index) => (
          <div key={index}>
            <h5>{category}</h5>
            <ul>
              {data.Skills[category].map((skill, sIdx) => (
                <li key={sIdx}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
