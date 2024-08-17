import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DateSelection.css';

export default function DateSelection() {
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/confirmation', { state: { date } });
    };

    return (
        <div className="date-selection-container">
            <h2 className="text-center text-2xl font-bold">Select a Date for the Movie!</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <button type="submit" className="submit-btn">Confirm Date</button>
            </form>
        </div>
    );
}
