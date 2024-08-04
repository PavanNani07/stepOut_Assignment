import React, { useState } from 'react';
import { bookSeat, getBooking } from '../../services/api';

const Booking = ({ token }) => {
    const [trainId, setTrainId] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [booking, setBooking] = useState(null);

    const handleBooking = async () => {
        try {
            const response = await bookSeat({ train_id: trainId }, token);
            setBookingId(response.data.id);
            alert('Booking successful');
        } catch (error) {
            alert('Booking failed');
        }
    };

    const fetchBooking = async () => {
        try {
            const response = await getBooking(bookingId, token);
            setBooking(response.data);
        } catch (error) {
            alert('Failed to fetch booking');
        }
    };

    return (
        <div>
            <input type="text" value={trainId} onChange={(e) => setTrainId(e.target.value)} placeholder="Train ID" />
            <button onClick={handleBooking}>Book Seat</button>
            <input type="text" value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder="Booking ID" />
            <button onClick={fetchBooking}>Get Booking Details</button>
            {booking && <div>Booking ID: {booking.id}, Train ID: {booking.train_id}</div>}
        </div>
    );
};

export default Booking;
