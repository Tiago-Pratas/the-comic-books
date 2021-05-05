import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getIssues = async (field, fieldValue, offset) => {
    return await axios.get('https://comicvine.gamespot.com/api/issues', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            limit: '50',
            offset,
            filter: `${field}:${fieldValue}`,
        },
    });
}