import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination-controls flex justify-center mt-4">
            <button
                className="mx-2 p-2 bg-white text-pink-500 rounded hover:bg-gray-100 transition ease-in-out duration-150"
                onClick={() => onPageChange('prev')}
                disabled={currentPage === 1}
            >
                <FontAwesomeIcon icon={faChevronLeft} /> Previous
            </button>
            <span className="mx-2 p-2 bg-white text-pink-500 rounded">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="mx-2 p-2 bg-white text-pink-500 rounded hover:bg-gray-100 transition ease-in-out duration-150"
                onClick={() => onPageChange('next')}
                disabled={currentPage === totalPages}
            >
                Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}
