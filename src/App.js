import React, {useState, useRef, useCallback} from 'react';
import useFetchMovies from "./hooks/useFetchMovies";
import MovieList from "./components/MovieList/MovieList";
import Filter from "./components/Filter/Filter";


const App = () => {

    const initialValues = {
        runtimeGte: 0,
        runtimeLte: 120,
        startDate: "",
        endDate: new Date(Date.now()).toISOString().split('T')[0],
    }

    const [page, setPage] = useState(1);
    const [runtime, setRuntime] = useState({gte: 0, lte: 120});
    const [releaseDateRange, setReleaseDateRange] = useState({startDate: '', endDate: ''})
    const [values, setValues] = useState(initialValues);

    const {
        loading,
        error,
        movieList,
        hasMore,
        setIsFilterApplied
    } = useFetchMovies(page, runtime, releaseDateRange)

    // Loader reference
    const observer = useRef(null);

    // Handling what happens when user scrolls to Load More div
    // in this case we just update page variable
    const loaderRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTimeout(() => setPage(pagePrev => pagePrev + 1), 200)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading]);

    const onSubmitHandler = e => {
        e.preventDefault();
        setReleaseDateRange({
            startDate: values.startDate,
            endDate: values.endDate
        })
        setRuntime({
            gte: values.runtimeGte,
            lte: values.runtimeLte,
        })
        setPage(1);
        setIsFilterApplied(true);
        window.scrollTo(0, 0)
    }

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
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
