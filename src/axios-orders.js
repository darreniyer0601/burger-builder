import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-9fd12-default-rtdb.firebaseio.com/'
});

export default instance;