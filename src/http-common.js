import axios from 'axios';

export default axios.create({
    // baseURL:'https://www.alegralabs.com:5008',
    baseURL:'https://e064-49-37-96-98.in.ngrok.io',
    headers:{
        'Content-type': 'application/json'
    }
});