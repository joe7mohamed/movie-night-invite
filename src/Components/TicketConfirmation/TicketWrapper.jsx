import React from 'react';

const TicketWrapper = ({ children }) => {
    return (
        <div className="ticket-wrapper max-w-2xl mx-auto my-8 shadow-lg rounded-lg overflow-hidden">
            {children}
        </div>
    );
};

export default TicketWrapper;
