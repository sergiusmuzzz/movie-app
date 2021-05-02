import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from "axios";
import MovieList from "./components/MovieList/MovieList";


const API_KEY = 'c7c5d1ce6c96e2785bed26f92732a5cc';

const App = () => {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    // Loader reference
    const observer = useRef(null);


    // API calls to returns JSON that's added to the state
    const fetchData = async () => {
        setLoading(true);
        setError(false);
        let cancel;
        const movies = await axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
            )
            .then(response => {
                return response
            })
            .catch(e => {
                console.log(e);
                setError(true);
            });

        const getDetails = id => {
            return axios
                .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`)
                .then(response => {
                    return response.data;
                });
        };

        const filteredMovies = await Promise.all(movies.data.results.map(async movie => {
            movie.details = await getDetails(movie.id);
            return movie.details;
        }));


        setHasMore(movies.data.results.length > 0);
        setMovieList(prevMovies => {
            console.log([...prevMovies, ...filteredMovies]);
            return [...prevMovies, ...filteredMovies];
        });
        setError(false);
        setLoading(false);
        return () => cancel()
    };

    // here we handle what happens when user scrolls to Load More div
    // in this case we just update page variable
    const loaderRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setTimeout(() => setPage(pagePrev => pagePrev + 1), 200)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        fetchData();

    }, [page]);


    return (
        <div className="App">
            <MovieList movieList={movieList}/>
            <div className="loading" ref={loaderRef}>
                <h2>{loading && 'Load More...'}</h2>
            </div>
            <div>{error && 'Error'}</div>
        </div>
    );
}

export default App;
