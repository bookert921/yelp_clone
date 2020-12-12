import React, { useState, useContext } from 'react';
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from '../contexts/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');
    
    const handleSubmit = async (e) =>{
        e.preventDefault(); // Reloading page causes React to lose state
        try {
            const response = await RestaurantFinder.post('/', {
                name,
                location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
        setName('name')
        setLocation('location')
        setPriceRange('')
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-6">
                        <input 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            placeholder="name"
                            required // If required in backend, make sure to require in frontend!
                        />
                    </div>
                    <div className="col-3">
                        <input 
                            value={location} 
                            onChange={e => setLocation(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            placeholder="location"
                            required
                        />
                    </div>
                    <div className="col-2">
                        <select 
                            value={priceRange} 
                            onChange={e => setPriceRange(e.target.value)} 
                            className="custom-select mr-sm-2"
                            required
                        >
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default AddRestaurant;
