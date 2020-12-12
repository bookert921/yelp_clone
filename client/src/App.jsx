import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { RestaurantsContextProvider } from './contexts/RestaurantsContext';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import Update from './routes/Update';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Switch> {/* Best Practice: Tells router to stop looking down list once first match found. */}
                        <Route exact path="/" component={Home} />
                        <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
                        <Route exact path="/restaurants/:id/update" component={Update} />
                    </Switch>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
};

export default App;

/** 
 * Thinking It Through...
 * 
 * Set up Routing for Front-End with react-router-dom
 * 3 Total Pages/Routes:
 *      /restaurants/:id as ResturantDetailPage.jsx
 *      /Restaurants as Home.jsx
 *      /restaurants/:id/update as Update.jsx
 * 
 * Flesh out Components
 *      Create hard-coded version of what you want to see. Add some style.
 * 
 * Store shared data in Context API so that all components have access to state. This completes the 
 * hard-coding portion.
 * 
 * 
 * */