import React from 'react';
import TicketWrapper from './TicketWrapper';
import TicketFront from './TicketFront';
import TicketBack from './TicketBack';

const Ticket = ({ title, image, serialNumber, screeningDate }) => {
    const terms = "This ticket cannot be replaced if lost, stolen or destroyed. Purchase from or resale by unauthorized sources may invalidate the ticket. No refunds or exchanges except as allowed in venue’s sole discretion. Event date & time are subject to change.";

    return (
        <TicketWrapper>
            <TicketFront title={title} image={image} />
            <TicketBack serialNumber={serialNumber} screeningDate={screeningDate} terms={terms} />
        </TicketWrapper>
    );
};

export default Ticket;
