import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState({
    business: [],
    entertainment: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async (category) => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category,
            apiKey: 'f15066ba4d9f471da7a240b812e0e5f1',
          },
        });
        setCategories((prevCategories) => ({
          ...prevCategories,
          [category]: response.data.articles.slice(0, 4), // Limit to 4 articles per category
        }));
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      }
    };

    const categoriesList = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    categoriesList.forEach((category) => fetchNews(category));
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container bg-stone-300 mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">News Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(categories).map((category) => (
          <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-3xl font-bold mb-4 capitalize">{category}</h2>
              {categories[category].map((article, index) => (
                <div key={index} className="mb-4">
                  {article.urlToImage && (
                    <img src={article.urlToImage} alt={article.title} className="w-full h-32 object-cover mb-2 rounded" />
                  )}
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-700 mb-2">{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;