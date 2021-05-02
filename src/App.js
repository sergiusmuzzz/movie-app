import React, {useState, useRef, useCallback} from 'react';
import useFetchMovies from "./hooks/useFetchMovies";
import MovieList from "./components/MovieList/MovieList";


const App = () => {

    const [page, setPage] = useState(1);

    const {
        loading,
        error,
        movieList,
        hasMore
    } = useFetchMovies(page)
    // Loader reference
    const observer = useRef(null);


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
