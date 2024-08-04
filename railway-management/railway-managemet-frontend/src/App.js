import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AddTrain from './components/Trains/AddTrain';
import TrainList from './components/Trains/TrainList';
import Booking from './components/Bookings/Booking';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/add-train">
                        <AddTrain token={token} />
                    </Route>
                    <Route path="/trains">
                        <TrainList token={token} />
                    </Route>
                    <Route path="/booking">
                        <Booking token={token} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
