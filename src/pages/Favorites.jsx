import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter(favoriteMeal => favoriteMeal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleNavigateToDetail = (idMeal) => {
    navigate(`/meal/${idMeal}`);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">My Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer dark:bg-gray-800 transition-all duration-300"
              onClick={() => handleNavigateToDetail(meal.idMeal)}
            >
              <div className="relative w-full pb-[100%]">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{meal.strMeal}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Area:</strong> {meal.strArea}</p>
              </div>
              <div className="p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromFavorites(meal.idMeal);
                  }}
                  className="bg-rose-400 text-white p-2 rounded-lg hover:bg-rose-500 w-full"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-800 dark:text-gray-300">No favorites yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
