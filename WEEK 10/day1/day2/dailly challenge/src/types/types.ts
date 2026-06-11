// Define the shape of a Recipe object from the API
export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
}

// Define the shape of a User object for future generic testing
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Generic slice state to handle any data array type
export interface DataState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}
