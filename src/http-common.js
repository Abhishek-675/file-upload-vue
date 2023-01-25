import axios from 'axios';

export default axios.create({
    // baseURL:'https://www.alegralabs.com:5008',
    baseURL:'http://localhost:5002/',
    // baseURL:'https://fe7e-49-37-96-187.in.ngrok.io/',
    headers:{
        'Content-type': 'application/json'
    }
});