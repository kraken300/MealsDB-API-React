import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MealDetail = ({ isDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMeal();
    checkIfFavorite();
  }, [id]);

  const fetchMeal = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setMeal(data.meals[0]);
  };

  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFav = favorites.some((favMeal) => favMeal.idMeal === id);
    setIsFavorite(isFav);
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favMeal) => favMeal.idMeal !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(meal);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <button
        onClick={handleGoBack}
        className="mb-2 bg-rose-500 text-white px-4 py-1 rounded-lg hover:bg-rose-600"
      >
        Back
      </button>
      <div className={`flex flex-col md:flex-row rounded-lg shadow-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto rounded-lg max-w-xs" 
          />
        </div>
        <div className="md:w-1/2 md:pl-2 flex flex-col justify-center items-start">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{meal.strMeal}</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><strong>Area:</strong> {meal.strArea}</p>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><strong>Category:</strong> {meal.strCategory}</p>
          <button
            onClick={handleToggleFavorite}
            className={`mt-2 text-white px-4 py-1 rounded-lg ${isFavorite ? 'bg-rose-500 hover:bg-rose-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
      <h2 className={`mt-2 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Instructions</h2>
      <p className={`text-gray-700 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="mt-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Watch Video</h2>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {meal.strYoutube}
          </a>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
