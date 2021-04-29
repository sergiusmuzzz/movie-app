import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import styles from './MovieList.module.css';

const MovieList = ({movieList}) => {
    return (
        <div className={styles.movieList}>
            {movieList.map(movie => (
            <>
                <MovieItem movie={movie} key={movie.id} />
            </>
            ))}
        </div>
    )
}

export default MovieList;