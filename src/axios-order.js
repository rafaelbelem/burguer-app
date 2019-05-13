import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burguer-app-af538.firebaseio.com/'
});

export default instance;