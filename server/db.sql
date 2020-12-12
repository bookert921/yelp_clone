-- CREATE DATABASE yelp_clone;

\c yelp_clone;

-- CREATE TABLE restaurants (
-- -- Can use anything as primary key such as SSN and email.
--     id BIGSERIAL PRIMARY KEY NOT NULL,
--     name VARCHAR(50) NOT NULL,
--     location VARCHAR(50) NOT NULL,
--     price_range INTEGER NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
-- );

-- CREATE TABLE reviews (
--     id BIGSERIAL NOT NULL PRIMARY KEY,
--     restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
--     name VARCHAR(50) NOT NULL,
--     review TEXT NOT NULL,
--     rating INT NOT NULL CHECK(rating >=1 AND rating <= 5)
-- );

-- Use aggragate functions
-- SELECT AVG(rating) FROM reviews WHERE id = 2;
-- SELECT restaurant_id, AVG(rating) FROM reviews GROUP BY restaurant_id;
-- SELECT restaurant_id, trunc(AVG(rating)), COUNT(rating) FROM reviews GROUP BY restaurant_id;

-- use join tables
-- SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id; -- This will only show restaurants with reviews.
-- SELECT * FROM restaurans LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;
-- SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;