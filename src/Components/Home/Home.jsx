import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loading from '../LoadingScreen/LoadingScreen';

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [nopePosition, setNopePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const moveNopeButton = () => {
        const randomX = Math.floor(Math.random() * 200) - 100;
        const randomY = Math.floor(Math.random() * 200) - 100;
        setNopePosition({ x: randomX, y: randomY });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
            <motion.img
                src="/images/home.svg"
                alt="Asking out"
                className="w-3/4 md:w-1/2 lg:w-1/3"
                animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 3 }}
            />

            <p className="mt-4 text-center text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                Hey there! Wanna join me for a cozy online movie date? <br />
                You bring the snacks, I will bring the movie! <br />
                Just don’t even think about clicking that ‘Nope’ button 😉
            </p>

            <div className="mt-8 flex space-x-4">
                <Link
                    to="/form"
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                    Accept
                </Link>

                <motion.button
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                    animate={nopePosition}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    onHoverStart={moveNopeButton}
                    onClick={moveNopeButton}
                >
                    Nope
                </motion.button>
            </div>
        </div>
    );
};

export default HomePage;
