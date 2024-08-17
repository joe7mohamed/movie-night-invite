import React from 'react';

const TicketBack = ({ serialNumber, screeningDate, terms }) => {
    return (
        <div className="ticket-back bg-green-900 text-white p-6 flex">
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="font-bold text-xs">SERIAL NO.</p>
                    <p className="text-lg">{serialNumber}</p>
                </div>
                <div className="mt-8">
                    <p className="font-bold text-xs">SCREENING DATE</p>
                    <p className="text-lg">{screeningDate}</p>
                </div>
            </div>
            <div className="flex-2 pl-8">
                <p className="text-sm">{terms}</p>
                {/* <p className="mt-4 text-xs">www.yourwebsite.com</p> */}
            </div>
        </div>
    );
};

export default TicketBack;
