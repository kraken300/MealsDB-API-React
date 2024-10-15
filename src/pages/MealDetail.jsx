import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MealDetail = () => {
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
    navigate(-1);
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <button
        onClick={handleGoBack}
        className="mb-4 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-4 dark:bg-gray-800 transition-all duration-300">
        <div className="md:w-1/2">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{meal.strMeal}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300"><strong>Area:</strong> {meal.strArea}</p>
          <p className="text-lg text-gray-600 dark:text-gray-300"><strong>Category:</strong> {meal.strCategory}</p>
          <button
            onClick={handleToggleFavorite}
            className={`mt-4 text-white px-4 py-2 rounded-lg ${isFavorite ? 'bg-rose-500 hover:bg-rose-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
      <h2 className="mt-4 text-xl font-semibold dark:text-white">Instructions</h2>
      <p className="text-gray-700 dark:text-gray-300">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold dark:text-white">Watch Video</h2>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
            {meal.strYoutube}
          </a>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
