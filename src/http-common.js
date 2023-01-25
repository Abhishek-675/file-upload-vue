import axios from 'axios';

export default axios.create({
    // baseURL:'https://www.alegralabs.com:5008',
    baseURL:'https://0102-49-37-96-187.in.ngrok.io/',
    headers:{
        'Content-type': 'application/json'
    }
});