import React from 'react';
import styles from './MovieItem.module.css';

const MovieItem = ({movie}) => {
    const certification = movie.release_dates.results.find(result => result.iso_3166_1 === 'US')?.release_dates[0].certification;
    const releaseDate = new Date(movie.release_date);
    const releaseYear = releaseDate.getFullYear();
    const timeConvert = n =>{
        const hours = (n / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return `${rhours} hour(s) ${rminutes} minute(s)`;
    }
    const genres = movie.genres.map(genre => genre.name).join(', ');
    console.log();
    return (
        <div className={styles.card}>
            <img className={styles.thumbnail}
                 src={movie.poster_path ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}` : 'https://via.placeholder.com/92'}
                 alt={movie.title}
            />
            <dl className={styles.movieInfo}>
                <dt><h2>{movie.title} <span className={styles.releaseYear}>({releaseYear})</span></h2></dt>
                <dd className={styles.stats}><span>{certification}</span> | <span>{timeConvert(movie.runtime)}</span> | <span>{genres}</span></dd>
                <dd className={styles.certication}>TMDB Rating: {movie.vote_average}</dd>
            </dl>
        </div>
    )
}

export default MovieItem;