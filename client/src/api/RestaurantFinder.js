import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1/restaurants';

export default axios.create({
    baseURL
});