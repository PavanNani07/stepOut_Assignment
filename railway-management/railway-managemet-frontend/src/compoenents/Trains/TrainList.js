import React, { useState } from 'react';
import { getTrains } from '../../services/api';

const TrainList = ({ token }) => {
    const [trains, setTrains] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const handleSearch = async () => {
        try {
            const response = await getTrains({ source, destination }, token);
            setTrains(response.data);
        } catch (error) {
            alert('Failed to fetch trains');
        }
    };

    return (
        <div>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" />
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
            <button onClick={handleSearch}>Search Trains</button>
            <ul>
                {trains.map(train => (
                    <li key={train.id}>{train.train_name} - {train.available_seats} seats available</li>
                ))}
            </ul>
        </div>
    );
};

export default TrainList;
