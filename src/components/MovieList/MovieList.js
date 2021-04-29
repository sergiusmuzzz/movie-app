import React from "react";
import MovieItem from "../MovieItem/MovieItem";

const MovieList = ({movieList}) => {
    return (
        <div>
            {movieList.map(movie => (
            <>
                <MovieItem movie={movie} key={movie.id} />
            </>
            ))}
        </div>
    )
}

export default MovieList;