import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

Modal.setAppElement('#root');

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [stock, setStock] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://content.guardianapis.com/search', {
          params: {
            'api-key': '40ab685f-5182-4ee1-855a-50dbba0effbf',
            'show-fields': 'headline,thumbnail,short-url',
            'order-by': 'newest',
            'page-size': 10,
          },
        });
        setArticles(response.data.response.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'New York',
            appid: 'd98e136c13e8e61ac8db5d7a6330e9ef',
            units: 'metric',
          },
        });
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const fetchStock = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: 'AAPL',
            apikey: 'E6CJGBZLM6ME6DKQ',
          },
        });
        setStock(response.data['Global Quote']);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchNews();
    fetchWeather();
    fetchStock();

    // Automatically open the modal when the page loads
    setModalContent({ weather, stock });
    setModalIsOpen(true);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    verticalSwiping: true,
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  return (
    <div className={`mx-auto font-poppins ${darkMode ? 'dark' : ''}`}>
      <div
        className="hero-section h-screen mb-8 text-white text-center relative"
        style={{
          backgroundImage: 'url("https://i.postimg.cc/tT4pcQFQ/pexels-markusspiske-97050.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center">
          <div className="breaking-news-ticker text-3xl bg-secondary w-full text-gray-900 py-2">
            <marquee>Breaking News: Latest updates on global events...</marquee>
          </div>
          <h1 className="text-7xl text-gray-900 font-bold mb-4">EchoSphere</h1>
          <p className="text-3xl text-gray-900 mb-8">Your one-stop destination for the latest news</p>
          <a href="/categories" className="bg-gray-900 text-primary px-4 py-2 rounded-full font-bold">Explore News</a>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Trending News</h1>
        <button onClick={toggleDarkMode} className="bg-primary text-white px-4 py-2 rounded">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div id="news" className="news-slider mb-8">
        <Slider {...sliderSettings}>
          {articles.slice(0, 5).map((article, index) => (
            <div key={index} className="relative h-64">
              {article.fields.thumbnail ? (
                <img src={article.fields.thumbnail} alt={article.webTitle} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl font-bold text-center">{article.webTitle}</h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">Top Headlines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.fields.thumbnail && (
              <img src={article.fields.thumbnail} alt={article.webTitle} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{article.webTitle}</h2>
              <p className="text-gray-700 mb-4">{article.fields.headline}</p>
              <a href={article.webUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Details Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-button">&times;</button>
          {modalContent && (
            <div>
              {modalContent.weather && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Weather Details</h2>
                  <p>Location: {modalContent.weather.name}</p>
                  <p>Description: {modalContent.weather.weather[0].description}</p>
                  <p>Temperature: {modalContent.weather.main.temp}°C</p>
                  <p>Humidity: {modalContent.weather.main.humidity}%</p>
                  <p>Wind Speed: {modalContent.weather.wind.speed} m/s</p>
                </div>
              )}
              {modalContent.stock && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold mb-2">Stock Market Details</h2>
                  <p>Symbol: {modalContent.stock['01. symbol']}</p>
                  <p>Price: ${modalContent.stock['05. price']}</p>
                  <p>Change: {modalContent.stock['09. change']} ({modalContent.stock['10. change percent']})</p>
                  <p>Volume: {modalContent.stock['06. volume']}</p>
                  <p>Latest Trading Day: {modalContent.stock['07. latest trading day']}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;