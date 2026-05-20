import React from 'react';

function FormComponent(props) {
  const { data, handleChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="firstName" 
        placeholder="First Name" 
        value={data.firstName}
        onChange={handleChange}
      />
      <br />
      
      <input 
        type="text" 
        name="lastName" 
        placeholder="Last Name" 
        value={data.lastName}
        onChange={handleChange}
      />
      <br />
      
      <input 
        type="text" 
        name="age" 
        placeholder="Age" 
        value={data.age}
        onChange={handleChange}
      />
      <br />
      
      <label>
        <input 
          type="radio" 
          name="gender" 
          value="male"
          checked={data.gender === 'male'}
          onChange={handleChange}
        /> Male
      </label>
      <br />
      
      <label>
        <input 
          type="radio" 
          name="gender" 
          value="female"
          checked={data.gender === 'female'}
          onChange={handleChange}
        /> Female
      </label>
      <br />
      
      <select 
        name="destination" 
        value={data.destination}
        onChange={handleChange}
      >
        <option value="">-- Please Choose a Destination --</option>
        <option value="Japan">Japan</option>
        <option value="Thailand">Thailand</option>
        <option value="Brazil">Brazil</option>
        <option value="France">France</option>
        <option value="Italy">Italy</option>
      </select>
      <br />
      
      <label>
        <input 
          type="checkbox" 
          name="nutsFree"
          checked={data.nutsFree}
          onChange={handleChange}
        /> Nuts Free
      </label>
      <br />
      
      <label>
        <input 
          type="checkbox" 
          name="lactoseFree"
          checked={data.lactoseFree}
          onChange={handleChange}
        /> Lactose Free
      </label>
      <br />
      
      <label>
        <input 
          type="checkbox" 
          name="vegan"
          checked={data.vegan}
          onChange={handleChange}
        /> Vegan
      </label>
      <br />
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;