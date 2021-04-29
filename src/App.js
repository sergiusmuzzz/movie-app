import React, {useState, useEffect} from 'react';
import axios from "axios";
import MovieList from "./components/MovieList/MovieList";


const API_KEY = 'c7c5d1ce6c96e2785bed26f92732a5cc';

const App = () => {

    const [initialized, setInitialized] = useState(false);
    const [movieList, setMovieList] = useState([]);


    // API calls to returns JSON that's added to the state
    const fetchData = async () => {
        const movies = await axios(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
        );

        const getDetails = id => {
            return axios
                .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`)
                .then(response => {
                    return response.data;
                });
        };

        const filteredMovies = await Promise.all(movies.data.results.map(async movie => {
            movie.details = await getDetails(movie.id);
            return movie;
        }));

        console.log(filteredMovies);
        setMovieList(filteredMovies);
    };

    //most popular movies titles based on average ratings

    useEffect(() => {
        // Call the API only once
        if (!initialized) {
            fetchData();
            setInitialized(true);
        }
    }, [initialized]);
    return (
        <div className="App">
            {console.log(movieList)}
            <MovieList movieList={movieList}/>
        </div>
    );
}

export default App;
