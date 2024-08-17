import { MovieCard } from '../MovieDetails/MovieCard';

export default function MovieGrid({ movies, onMovieSelect }) {
    return (
        <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />
            ))}
        </div>
    );
}
