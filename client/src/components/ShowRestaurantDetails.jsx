import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../contexts/RestaurantsContext';
import AddReview from './AddReview';
import Reviews from './Reviews';
import StarRating from './StarRating';

const ShowRestaurantDetails = () => {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(response.data.data); // if .restaurant remove to access both objects.
                console.log(response.data.data)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, [])
    return (
        <div>
            {selectedRestaurant && (
                <>
                <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                    <span className="text-warning ml-1">
                        {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews}/>
                    <AddReview />
                </div>
                </>
            )}
        </div>
    );
};

export default ShowRestaurantDetails;