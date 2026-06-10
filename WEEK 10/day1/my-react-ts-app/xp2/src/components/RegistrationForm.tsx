import React from 'react';
import { useForm, FormValues, FormErrors } from '../hooks/useForm';

const initialValues = {
  email: '',
  password: '',
};

const validate = (values: typeof initialValues): FormErrors => {
  const errors: FormErrors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const RegistrationForm: React.FC = () => {
  const handleFormSubmit = async (formValues: typeof initialValues) => {
    // Simulate API registration request
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(`Successfully registered user: ${formValues.email}`);
        resolve();
      }, 1000);
    });
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues,
    validate,
    onSubmit: handleFormSubmit,
  });

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Register</h2>
      {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', display: 'block' }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', display: 'block' }}
        />
        {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px' }}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
