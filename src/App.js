import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  // Fetch all movies (same as before)
  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      const allMovies = response.data;
      setMovies(allMovies); // Set the list of movies
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      

       const singleMovie = response.data;
       setMovie(singleMovie);
       setReviews(singleMovie.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding a review (triggered by user submission)
  const handleAddReview = async (movieId, newReview) => {
    try {
      // Assuming the API has a POST endpoint to add reviews
      const response = await api.post(`/api/v1/movies/${movieId}/reviews`, {
        review: newReview, // Submit the review
      });

      
      getMovieData(movieId); // Re-fetch the movie and reviews
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}  handleAddReview={handleAddReview} />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
