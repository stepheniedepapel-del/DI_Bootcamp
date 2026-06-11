import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { getRecipes } from './features/dataSlice';
import { DataFetcher } from './components/DataFetcher';
import { Recipe } from './types/types';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Extracting slice data from store
  const { items, loading, error } = useSelector((state: RootState) => state.recipesData);

  // Memoize or reference the action dispatch function safely
  const handleFetchRecipes = () => {
    dispatch(getRecipes());
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Daily Challenge: Generic Data Fetcher</h1>
      
      {/* Implementing the generic DataFetcher component with Recipe types */}
      <DataFetcher<Recipe>
        data={items}
        loading={loading}
        error={error}
        fetchData={handleFetchRecipes}
        renderItem={(recipe) => (
          <div>
            <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ margin: '10px 0 5px 0' }}>{recipe.name}</h3>
            <p style={{ margin: '0', color: '#666' }}>Cuisine: <strong>{recipe.cuisine}</strong></p>
            <p style={{ margin: '5px 0 0 0', color: '#ffa500' }}>★ {recipe.rating}</p>
          </div>
        )}
      />
    </div>
  );
}
