import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../contexts/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    /** 
     * useHistory when trying to fix the problem a user may face when trying to bookmark a specific page.
     * It represents the history of the browser and is a hook from react-router-dom.
     * */
    let history = useHistory();
    /** 
     * useEffect does not like to return a promise. 
     * Therefore, you must put your async/await to another function and use useEffect to call 
     * that function. 
     * */
    useEffect(()=>{ // Fetch data as soon as component mounts on screen.
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get('/')
                console.log(response.data.data.restaurants)
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, []); // Avoid loops by passing an empty array. Tells browser to only load once rather than loading every time component is rerendered.

    const handleDelete = async (e, id) =>{
        e.stopPropagation(); // Prevents event from reaching any object other than the current.
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log('Item Deleted!')
            setRestaurants(restaurants.filter(restaurant=>{
                return restaurant.id !== id
            }));
        } catch (err) {
            console.error(err);
        };
    };

    const handleUpdate = (e, id) =>{
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    };

    // When first written, this code breaks handleUpdate.
    const handleRestaurantSelect = (id) =>{
        history.push(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) =>{
        if (!restaurant.count){
            return <span className="text-warning">0 Reviews</span>
        }
        return (
            <>
                <StarRating rating={restaurant.id}/>
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurants</th>
                        <th scope="col">Locations</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Raiting</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {/* If no restaurants found, wait for restaurants and then load. (prevents error from if no restaurants are found on first load) */}
                {restaurants && restaurants.map((restaurant) => {
                    return (
                        <tr 
                            key={restaurant.id}
                            onClick={() => handleRestaurantSelect(restaurant.id)} 
                            style={{cursor: 'pointer'}}
                        >
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
                    {/* <tr>
                        <td>McDonald's</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
};

export default RestaurantList;
