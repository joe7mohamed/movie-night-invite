import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 text-center">
            <div>
                <h1 className="text-5xl font-bold text-red-600">404 - Not Found</h1>
                <p className="mt-4 text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>
                <Link to="/">
                    <button className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
