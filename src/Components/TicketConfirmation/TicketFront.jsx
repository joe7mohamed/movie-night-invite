import React from 'react';

const TicketFront = ({ title, image }) => {
    return (
        <div className="ticket-front flex bg-white">
            <img src={image} alt={title} className="w-2/3 object-cover" />
            <div className="text-gray-800 p-6 w-1/3 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
            </div>
        </div>
    );
};

export default TicketFront;
