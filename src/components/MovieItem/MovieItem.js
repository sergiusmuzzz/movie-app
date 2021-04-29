import React from 'react';

const MovieItem = ({movie}) => {
    return(
        <div>
            <span>{movie.title}</span>
            <span>{movie.vote_average}</span>
        </div>
    )
}

export default MovieItem;