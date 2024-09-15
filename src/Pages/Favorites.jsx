import React, { useState, useEffect } from 'react';
import RecipeCard from '../Components/RecipeCard'; 
import '../Styles/Favorites.css';
import { FaTrashAlt } from 'react-icons/fa'; 

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteRecipes(storedFavorites);
  }, []);

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favoriteRecipes.filter(recipe => recipe.id !== recipeId);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-list">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card-container">
              <RecipeCard 
                recipe={recipe} 
                onRemoveFromFavorites={() => removeFromFavorites(recipe.id)}
              />
              
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite recipes yet!</p>
      )}
    </div>
  );
};

export default Favorites;
