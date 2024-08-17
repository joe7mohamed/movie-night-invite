import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieSelection.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MovieGrid from './MovieGrid';
import Pagination from './Pagination';

export default function MovieSelection() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(() => {
        // Get the current page from local storage or default to 1
        return parseInt(localStorage.getItem('currentPage')) || 1;
    });
    const [totalPages, setTotalPages] = useState(1);
    const [genres, setGenres] = useState([]);
    const selectedGenres = JSON.parse(localStorage.getItem('selectedGenres'));
    const loadedPagesRef = useRef(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: '840037dbd0439b1f8c8bdc5ab0cf3f11', // Replace with your TMDb API key
                    }
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const fetchMovies = useCallback(async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                params: {
                    api_key: '840037dbd0439b1f8c8bdc5ab0cf3f11', // Replace with your TMDb API key
                    with_genres: selectedGenres.join(','),
                    sort_by: 'popularity.desc',
                    page: page
                }
            });

            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
            loadedPagesRef.current.add(page);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
        }
    }, [selectedGenres]);

    useEffect(() => {
        const storedScrollPosition = parseInt(localStorage.getItem('scrollPosition')) || 0;

        if (selectedGenres && !loadedPagesRef.current.has(currentPage)) {
            fetchMovies(currentPage).then(() => {
                window.scrollTo(0, storedScrollPosition); // Restore scroll position
            });
        }

        return () => {
            localStorage.removeItem('scrollPosition'); // Clear the scroll position when unmounting
        };
    }, [selectedGenres, currentPage, fetchMovies]);

    const handleMovieSelection = (movie) => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        localStorage.setItem('scrollPosition', window.scrollY); // Store current scroll position
        navigate(`/movie/${movie.id}`, { state: { movie } });
    };

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        localStorage.setItem('currentPage', currentPage + (direction === 'next' ? 1 : -1)); // Store current page
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => genres.find(genre => genre.id === id)?.name || '').join(', ');
    };

    if (loading && !loadedPagesRef.current.has(currentPage)) {
        return <LoadingScreen />;
    }

    return (
        <div className="movie-selection-container p-4 bg-pink-500 text-white min-h-screen">
            <h2 className="text-center text-2xl font-bold mb-4">Welcome to the Movie Selection!</h2>
            <p className="text-center text-lg mb-4">Remember, 27 is a special number. Let's pick the perfect movie!</p>
            <div className="selected-categories mb-4 text-center">
                <h3 className="text-xl font-semibold">Selected Categories:</h3>
                <p>
                    {selectedGenres.map(genreId => (
                        <span key={genreId} className="inline-block bg-white text-pink-500 px-2 py-1 rounded-full m-1">
                            {getGenreNames([genreId])}
                        </span>
                    ))}
                </p>
            </div>
            <MovieGrid movies={movies} onMovieSelect={handleMovieSelection} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
