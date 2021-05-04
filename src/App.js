import React, {useState, useRef, useCallback} from 'react';
import useFetchMovies from "./hooks/useFetchMovies";
import MovieList from "./components/MovieList/MovieList";
import Filter from "./components/Filter/Filter";


const App = () => {
    const initialValues = {
        runtimeGte: 0,
        runtimeLte: 120,
    }

    const [page, setPage] = useState(1);
    const [runtime, setRuntime] = useState({gte: 0, lte: 0});
    const [values, setValues] = useState(initialValues);

    const {
        loading,
        error,
        movieList,
        hasMore,
        setIsFilterApplied
    } = useFetchMovies(page, runtime)
    // Loader reference
    const observer = useRef(null);


    // here we handle what happens when user scrolls to Load More div
    // in this case we just update page variable
    const loaderRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                setTimeout(() => setPage(pagePrev => pagePrev + 1), 200)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading]);

    const onSubmitHandler = e => {
        e.preventDefault();
        setRuntime({
            gte: values.runtimeGte,
            lte: values.runtimeLte,
        })

        setIsFilterApplied(true);
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }



    return (
        <div className="App">
            <Filter
                values={values}
                onSubmitHandler={onSubmitHandler}
                onChangeHandler={onChangeHandler}
                setValues={setValues}
            />
            <div className="content">
                <MovieList movieList={movieList}/>
                {hasMore &&
                    <div className="loading" ref={loaderRef}>
                        <h2>{loading && 'Load More...'}</h2>
                    </div>
                }
                {error &&
                    <div>Error</div>
                }
            </div>
        </div>
    );
}

export default App;
