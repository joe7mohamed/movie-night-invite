import { Link } from "react-router-dom";
// import Backup from "../assets/backup.png";

export const MovieCard = ({ movie }) => {
    const { id, original_title, poster_path } = movie;
    const posterImg = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup;

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Link to={`/movie/${id}`} state={{ movie }}>
                <img className="rounded-t-lg object-cover h-96 w-full" src={posterImg} alt={original_title} />
            </Link>
            <div className="p-5 text-center">
                <Link to={`/movie/${id}`} state={{ movie }}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{original_title}</h5>
                </Link>
            </div>
        </div>
    );
};
