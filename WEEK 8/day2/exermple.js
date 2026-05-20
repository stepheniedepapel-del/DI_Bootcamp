import React, { Component } from "react";
import data from "./complexData.json";

class Example1 extends Component {
  render() {
    return (
      <div className="m-3">
        <h3>Social Medias</h3>
        <ul>
          {data.SocialMedias.map((link, index) => (
            <li key={index}><a href={link}>{link}</a></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;
