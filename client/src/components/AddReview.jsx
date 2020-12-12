import React, {useState} from 'react';
import {useParams } from 'react-router-dom'; 
import RestaurantFinder from '../api/RestaurantFinder';

const AddReview = () => {
    const {id} = useParams();
    // const history = useHistory();
    // const location = useLocation();
    const [name, setName] = useState('');
    const [rating, setRating] = useState('Rating');
    const [reviewText, setReviewText] = useState('');
    
    const handleReview = async (e) =>{
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            });
        } catch (err) {
            console.error(err)
        }
        // One way to do it is with react hooks. Navigate to home become coming back to location.pathname.
        // history.push("/")
        // history.push(location.pathname)

        // The easy way...
        window.location = `/restaurants/${id}/`
    };

    return (
        <div className="mb-2">
            <form onSubmit={handleReview}>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name" 
                            placeholder="name" 
                            type="text" 
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select 
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            id="rating" 
                            className="custom-select"
                        >
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)} 
                        id="review" 
                        className="form-control"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;