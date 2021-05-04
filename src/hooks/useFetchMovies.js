import {useState, useEffect} from 'react';
import axios from "axios";

const API_KEY = 'c7c5d1ce6c96e2785bed26f92732a5cc';

const useFetchMovies = (page, runtime) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);


    // API calls to returns JSON that's added to the state
    const fetchData = async () => {
        // setIsFilterApplied(true);
        setLoading(true);
        setError(false);
        let cancel;
        const movies = await axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_runtime.gte=${runtime.gte}&with_runtime.lte=${runtime.lte}`
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
        }))/*.then(res => res.sort((a, b) => a.runtime - b.runtime))*/;


        setHasMore(true);

        if (isFilterApplied) {
            setMovieList([...filteredMovies]);
            setIsFilterApplied(false);
        } else {
            setMovieList(prevMovies => {
                console.log([...prevMovies, ...filteredMovies]);
                return [...prevMovies, ...filteredMovies];
            });
        }
        setError(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();

    }, [page, runtime]);

    return {loading, error, movieList, hasMore, setIsFilterApplied}
}

export default useFetchMovies;