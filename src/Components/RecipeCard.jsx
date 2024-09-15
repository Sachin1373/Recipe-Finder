import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css'; 
import { FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa';

const RecipeCard = ({ recipe, onAddToFavorites, onRemoveFromFavorites }) => {
  const handleAddToFavorites = () => {
    onAddToFavorites && onAddToFavorites(recipe);
  };

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites && onRemoveFromFavorites(recipe.id);
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-link">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-title">{recipe.title}</div>
      </Link>

      <div className="icon-container">
      
        <div className="favorite-icon" onClick={onAddToFavorites ? handleAddToFavorites : handleRemoveFromFavorites}>
          {onAddToFavorites ? <FaHeart /> : ''}
        </div>
        
        
        {onRemoveFromFavorites && (
          <div className="remove-icon" onClick={handleRemoveFromFavorites}>
            <FaTrashAlt />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
