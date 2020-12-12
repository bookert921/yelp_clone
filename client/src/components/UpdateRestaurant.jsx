import React, {useState, useEffect} from 'react';
// import { RestaurantsContext } from '../contexts/RestaurantsContext';
import {useHistory, useParams} from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const UpdateRestaurant = (props) => {
    /** 
     * When trying to figure out how to access the object you want to update, 
     * if params are given in the URL, you can use react-router-dom's useParams function.
     * */
    const {id} = useParams();
    let history = useHistory();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    
    /**
     * Cound useContext but it will only work if the user has been to the page and downloaded it first.
     * This is because the homepage with the RestaurantList is responsible for fetching the API.
     * It is better to reuse useEffect in these cases to fetch the API independently.
     */
    // const [restaurants, setRestaurants] = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                console.log(response.data.data)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        history.push('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            id="name"
                            onChange={e => setName(e.target.value)} 
                            type="text" 
                            className="form-control"
                            required
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        id="location"
                        onChange={e => setLocation(e.target.value)} 
                        type="text" 
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                        value={priceRange}
                        id="price_range"
                        onChange={e => setPriceRange(e.target.value)} 
                        type="number" 
                        className="form-control"
                        required // Must require here as well to prevent updates from allowing null values.
                    />
                </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
            </form>
        </div>
    )
}

export default UpdateRestaurant;