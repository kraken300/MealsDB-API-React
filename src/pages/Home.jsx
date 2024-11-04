import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async (search = '') => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals(searchTerm);
  };

  const handleNavigateToDetail = (idMeal) => {
    navigate(`/meal/${idMeal}`);
  };

  return (
    <div className="container mx-auto p-6">
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for meals..."
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            type="submit"
            className="bg-rose-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-rose-600"
          >
            Search
          </button>
        </form>
      </div>

      {loading && (
        <p className="text-center text-gray-700">Loading...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer dark:bg-gray-800"
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
                <p
                  className="mt-2 text-rose-500 cursor-pointer hover:underline"
                  onClick={() => handleNavigateToDetail(meal.idMeal)}
                >
                  View Recipe
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-800 dark:text-gray-300">No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
