import React, { useEffect, useState } from "react";

// import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import MovieCard from "./Component/MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=b0673ed4"

const App = () =>{
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovie = async(title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovie('batman');
  }, []);

  return(
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
          />
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
            { movies.map((movie) =>(
                <MovieCard movie={movie}/>
              )) 
            }
          </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}

    </div>
  );
}

export default App;
