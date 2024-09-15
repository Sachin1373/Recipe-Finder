import React, { useState, useEffect, Suspense } from 'react';
const RecipeCard = React.lazy(() => import('../Components/RecipeCard'));
import axios from 'axios';
import '../Styles/Home.css';
import bg from '../assets/Background.jpg';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [recipes, setRecipes] = useState( []); 
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'dccc369652aa4e7e8950df8d43f78dcc';

  useEffect(() => {
    
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getRecipes = async (retryCount = 3) => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            query: searchQuery,
            apiKey: API_KEY,
            number: 10,
          },
        }
      );
      setRecipes(response.data.results);

      
      localStorage.setItem('recipes', JSON.stringify(response.data.results));

    } catch (err) {
      if (retryCount > 0) {
        getRecipes(retryCount - 1);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const addToFavorites = (recipe) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Avoid duplicates
    if (!storedFavorites.find(fav => fav.id === recipe.id)) {
      const updatedFavorites = [...storedFavorites, recipe];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };
  

  return (
    <div className='home-page'>
      <h2>Find Your Favorite Recipes</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={searchQuery}
          placeholder="Search for recipes..."
          onChange={handleInputChange}
          className="search-bar" />
        <button type="submit" className="search-button">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onAddToFavorites={addToFavorites} />
          ))
        ) : (
          <p>Try searching for something!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
