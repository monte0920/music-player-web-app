import axios from 'axios';
// export const SERVER_URL = 'http://localhost:8080/';
export const SERVER_URL = 'http://api.harpermusic.com.au/';

const API = async (method = 'GET', url, data = {}) => {
    try {
        const response = await axios({
            method,
            url: `${SERVER_URL}api/${url}`,
            data,
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response;
    } catch (error) {
        console.log(error)
    }
};

export default API;