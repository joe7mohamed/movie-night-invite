import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'react-lottie';
import rollingCinemaAnimation from '../../assets/animation/rolling-cinema.json';
import './InteractiveForm.css';

export default function InteractiveForm() {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: '840037dbd0439b1f8c8bdc5ab0cf3f11', // Replace with your API key
            }
        })
            .then(response => setGenres(response.data.genres))
            .catch(error => console.error('Error fetching genres:', error));
    }, []);

    const handleGenreSelection = (genreId) => {
        setSelectedGenres(prev =>
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
        localStorage.setItem('selectedDate', date);
        navigate('/movies');
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: rollingCinemaAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="form-container mx-auto p-6 bg-white text-pink-700 rounded-lg shadow-lg max-w-xl">
            <div className="text-center mb-6">
                <Lottie options={defaultOptions} height={100} width={100} />
            </div>
            <h2 className="text-center text-3xl font-bold mb-6">
                Tell Me About Your Movie Preferences!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="genre-selection grid grid-cols-2 gap-4">
                    {genres.map(genre => (
                        <div
                            key={genre.id}
                            className={`genre-card p-4 border rounded-lg cursor-pointer flex items-center justify-center 
                                ${selectedGenres.includes(genre.id) ? 'bg-pink-500 text-white' : 'bg-gray-100 text-pink-700'}`}
                            onClick={() => handleGenreSelection(genre.id)}
                        >
                            <i className={`fas fa-${getIconForGenre(genre.name.toLowerCase())} mr-2`}></i>
                            {genre.name}
                        </div>
                    ))}
                </div>

                <div className="date-selection">
                    <label htmlFor="date" className="text-xl font-semibold">Pick a Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-2 p-3 w-full rounded-lg border text-pink-700"
                    />
                </div>

                <button type="submit" className="submit-btn w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all">
                    Submit
                </button>
            </form>
        </div>
    );
}

function getIconForGenre(genre) {
    const genreIcons = {
        action: 'fist-raised',
        adventure: 'hiking',
        comedy: 'laugh',
        drama: 'theater-masks',
        fantasy: 'hat-wizard',
        horror: 'ghost',
        romance: 'heart',
        sciencefiction: 'robot',
        thriller: 'skull-crossbones',
        // Add more mappings as necessary
    };
    return genreIcons[genre] || 'film';
}
