import React from "react";

function FormComponent(props) {
  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Form submission uses native GET method to append query strings to the URL */}
      <form method="GET" action="">
        <input
          type="text"
          name="firstName"
          value={props.data.firstName}
          onChange={props.handleChange}
          placeholder="First Name"
        />
        <br />

        <input
          type="text"
          name="lastName"
          value={props.data.lastName}
          onChange={props.handleChange}
          placeholder="Last Name"
        />
        <br />

        <input
          type="number"
          name="age"
          value={props.data.age}
          onChange={props.handleChange}
          placeholder="Age"
        />
        <br />

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={props.data.gender === "male"}
            onChange={props.handleChange}
          /> Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={props.data.gender === "female"}
            onChange={props.handleChange}
          /> Female
        </label>
        <br />

        <select
          name="destination"
          value={props.data.destination}
          onChange={props.handleChange}
        >
          <option value="">-- Please choose a destination --</option>
          <option value="Thailand">Thailand</option>
          <option value="Japan">Japan</option>
          <option value="Brazil">Brazil</option>
        </select>
        <br />

        <label>
          <input
            type="checkbox"
            name="isVegan"
            checked={props.data.isDietary.isVegan}
            onChange={props.handleChange}
          /> Vegan
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="lactoseFree" // Named exactly to match expected URL requirements
            checked={props.data.isDietary.lactoseFree}
            onChange={props.handleChange}
          /> Lactose Free
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      <hr />
      <h2>Entered Information:</h2>
      <p>Your name: {props.data.firstName} {props.data.lastName}</p>
      <p>Age: {props.data.age}</p>
      <p>Gender: {props.data.gender}</p>
      <p>Destination: {props.data.destination}</p>
      <p>Dietary restrictions:</p>
      <ul>
        <li>Vegan: {props.data.isDietary.isVegan ? "Yes" : "No"}</li>
        <li>Lactose Free: {props.data.isDietary.lactoseFree ? "Yes" : "No"}</li>
      </ul>
    </main>
  );
}

export default FormComponent;
