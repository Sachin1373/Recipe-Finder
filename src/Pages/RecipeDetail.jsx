import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/RecipeDetails.css'

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the route
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'dccc369652aa4e7e8950df8d43f78dcc';

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            apiKey: API_KEY,
          },
        }
      );
      setRecipeDetails(response.data);
    } catch (err) {
      setError('Failed to fetch recipe details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipeDetails) {
    return <p>No details found for this recipe.</p>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipeDetails.title}</h2>
      <img src={recipeDetails.image} alt={recipeDetails.title} />
      <p dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
      <h3>Ingredients:</h3>
      <ul>
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
    </div>
  );
};

export default RecipeDetail;
