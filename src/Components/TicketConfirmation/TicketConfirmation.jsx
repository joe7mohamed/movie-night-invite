import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import Ticket from './Ticket';
import coupleAnimation from '../../assets/animation/coupleAnimation.json';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const loveQuotes = [
  "You are the light of my life.",
  "With you, every moment is sweet.",
  "I am yours, forever and always.",
  "To the world, you may be one person, but to me, you are the world."
];

const TicketConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const [showTicket, setShowTicket] = useState(false);
  const [quote, setQuote] = useState('');
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const storedMovie = JSON.parse(localStorage.getItem('confirmedMovie'));
    const storedDate = localStorage.getItem('selectedDate');

    if (!storedMovie || !storedDate) {
      window.location.href = '/error'; // Redirect if data is missing
      return;
    }

    const serialNumber = Math.floor(100000 + Math.random() * 900000).toString(); // Generate dynamic serial number

    setMovieData({
      title: storedMovie.title,
      image: `https://image.tmdb.org/t/p/w500/${storedMovie.poster_path}`,
      serialNumber,
      screeningDate: storedDate,
    });

    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    setQuote(randomQuote);

    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setShowTicket(true);
      }, 3000); // Show the ticket after 3 seconds
    }, 3000); // Initial delay
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!movieData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-500 text-white">
        <p>Error: Movie data not found. Please select a movie first.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main Ticket Content */}
      <div className="z-10 p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl bg-white">
        <div className="flex justify-center mb-4">
          <Lottie options={{ loop: true, autoplay: true, animationData: coupleAnimation }} height="40%" width="40%" />
        </div>
        <p className="mb-4 text-center font-bold text-gray-800">
          Congratulations! You have successfully reserved a ticket for this date. Get ready for an evening full of love and popcorn! 🍿❤️
        </p>
        <Ticket
          title={movieData.title}
          image={movieData.image}
          serialNumber={movieData.serialNumber}
          screeningDate={movieData.screeningDate}
        />
        <div className="mt-6 text-center font-semibold p-4 rounded-lg shadow-inner bg-pink-100 text-pink-500">
          <p className="text-lg italic">"{quote}"</p>
          <p className="mt-2">Share this ticket with your movie partner! ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;
