// MODULES
require('dotenv').config();
const express = require('express');
const db = require('./db')
const morgan = require('morgan');
const cors = require('cors');

// VARIABLES
// Create Express instance.
const app = express();
const PORT = process.env.MOCK_YELP_PORT || 5000;

// MIDDLEWARE MODULES
/** 
* These are functions that sit between the request and the response between the Client and Server to modify 
* data before/after being handle. Route handlers are technically middleware also. Therefore, anything you can do with a Route Handler you can do with Middleware. Placement is important!
*/
app.use(cors());
// app.use((req, res, next)=>{
//     console.log('Yay, our middleware ran!');
//     next(); // Must be called to move on to next middleware.
// });
app.use(morgan('dev')); // Logging Middleware, has it's own next set up.
app.use(express.json()) // JSON parsing middleware. Al`lows you to access req.body by converting to JS object.
// app.use((req, res, next)=>{
//     console.log('Yay, our middleware ran!');
//     next(); // Must be called to move on to next middleware.
// });

// ROUTES
/** 
* When setting up routes. It is considered good practice to declare that you are connecting to an API and to 
* include the version number. For example, /api/v1/resturants/:id
*/

// Get All
app.get('/api/v1/restaurants', async (req, res)=>{ // The Second Parameter is called a Route Handler.
    // An API does not normally send back text, it sends back a JSON
    // res.send('These are all the resturants');
    try {
        /**
         * Replace SELECT * FROM restaurants;
         */
        // const results = await db.query("SELECT * FROM restaurants");
        // console.log(results);
        const restaurantRatingData = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id");
        console.log(restaurantRatingData);
        // Sending a JSON allows the Client-Side to easily parse the data.
        // Here you can utilize Postman to test routes before creating the Client-Side.
        res.status(200).json({
        status: 'success',
        results: restaurantRatingData.rows.length,
        data: {
            restaurants: restaurantRatingData.rows
        }
    });
    } catch (err) {
        console.error(err)
    }
});

/** 
 * Setting up a Review can be done in two ways.
 *  1) By creating a separate route handler for Review and making 2 API calls to your backend on one page.
 *  2) Adding another code block to trycatch in Get One route. 
 * 
 * Choose #2 and don't forget to update frontend!
 */
// Get One
app.get('/api/v1/restaurants/:id', async (req, res)=>{
    // Params get logged into a Params object.
    console.log(req.params.id);
    try {
        // const result = await db.query(`SELECT * FROM restaurants where id = ${req.params.id}`); // The wrong way, template strings inside query strings is consided bad practice. Can lead to sql injection attacks.
        /**
         * Replace SELECT * FROM restaurants WHERE id = $1
         */
        const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1", [req.params.id]); // This is a parameteriezed query. You can pass as many placeholders as you want.
        // console.log(restaurant.rows[0]);
        // console.log(reviews);

        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);
        console.log(reviews.rows) 
        
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (err) {
        console.error(err)
    }
});

// Create
app.post('/api/v1/restaurants', async (req, res)=>{
    console.log(req.body); // req.body does not exist until we use express middleware express.json()
    try {
        const result = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(result)
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.error(err)
    }
});

// Update
app.put('/api/v1/restaurants/:id', async (req, res)=>{
    console.log(req.params.id);
    console.log(req.body);
    try {
        const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
        console.log(result);
    } catch (err) {
        console.error(err);
    }
});

// Delete
app.delete('/api/v1/restaurants/:id', async (req, res)=>{
    try {
        const result = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        console.log(result)
        res.status(204).json({
            status: "success"
        });       
    } catch (err) {
        console.error(err);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res)=>{
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
    };
});

app.listen(PORT, ()=>{
    console.log(`Now connected to http://localhost:${PORT}`);
});