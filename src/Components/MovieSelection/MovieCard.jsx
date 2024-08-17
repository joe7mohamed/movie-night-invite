// import React from 'react';

export function MovieCard({ movie, onMovieSelect }) {
    return (
        <div
            className="movie-card cursor-pointer"
            onClick={() => onMovieSelect(movie)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-full object-cover"
            />
            <div className="mt-2 text-center text-white">
                <h3 className="font-bold">{movie.title}</h3>
            </div>
        </div>
    );
}
