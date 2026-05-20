import React, { Component } from "react";
import data from "./complexData.json";

class Example3 extends Component {
  render() {
    return (
      <div className="m-3">
        <h3>Experiences</h3>
        {data.Experiences.map((exp, index) => (
          <div key={index} className="border p-2 mb-2">
            <h4>{exp.company}</h4>
            {exp.roles.map((role, rIndex) => (
              <div key={rIndex}>
                <p><strong>Role:</strong> {role.title} ({role.year})</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
