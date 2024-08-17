import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import teddyBearAnimation from '../../assets/animation/teddy-bear-animation.json'; // Path to your teddy bear animation JSON file
import './MovieDetails.css';
import axios from 'axios';


export default function MovieDetails() {
    const location = useLocation();
    const { movie } = location.state;
    const [trailer, setTrailer] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
            params: {
                api_key: '840037dbd0439b1f8c8bdc5ab0cf3f11',
            }
        })
            .then(response => {
                const trailerData = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setTrailer(trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : null);
            })
            .catch(error => {
                console.error('Error fetching trailer:', error);
            });
    }, [movie.id]);

    const selectedDate = localStorage.getItem('selectedDate');

    const handleTicketConfirmation = () => {
        setShowAnimation(true);
        setTimeout(() => {
            localStorage.setItem('confirmedMovie', JSON.stringify(movie));
            navigate('/ticket-confirmation');
        }, 3000); // Wait 3 seconds before navigating
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: teddyBearAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="movie-details-container p-4 bg-pink-500 text-white min-h-screen">
            <div className="movie-details-content">
                <h2 className="text-center text-3xl font-bold mb-4">
                    <FontAwesomeIcon icon={faHeart} className="mr-2 text-red-500" />
                    {movie.title}
                </h2>
                <p className="text-center text-xl mb-2">
                    <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-400" />
                    Rating: {movie.vote_average}
                </p>
                <p className="text-center text-lg mb-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    Release Date: {movie.release_date}
                </p>
                {selectedDate && (
                    <p className="text-center text-lg mb-4">
                        This is our official movie online date {selectedDate} ❤️😊
                    </p>
                )}
                {trailer ? (
                    <div className="trailer-container mb-4">
                        <iframe
                            width="100%"
                            height="400px"
                            src={trailer}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <p className="text-center">Trailer not available</p>
                )}
                <div className="text-center">
                    <button
                        onClick={handleTicketConfirmation}
                        className="mt-4 py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-all"
                    >
                        Choose this movie to be our first movie ❤️
                    </button>
                    {showAnimation && (
                        <div className="mt-4">
                            <p className="text-2xl font-bold animate-bounce">
                                Preparing your special movie date... ❤️
                            </p>
                            <div className="flex justify-center mt-4">
                                <Lottie options={defaultOptions} height={100} width={100} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
