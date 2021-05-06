import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const searchIssues = async (field, fieldValue, offset) => {
    return await axios.get('https://comicvine.gamespot.com/api/issues', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            limit: '50',
            offset,
            filter: `${field}:${fieldValue}`,
        },
    });
};

const getIssues = async (apiRef, result) => {
    return await axios.get(
        `https://comicvine.gamespot.com/api/issue/4000-${apiRef}/`,
        {
            params: {
                api_key: process.env.API_KEY,
                offset: result,
                format: 'json',
            },
        },
    );
};

const saveIssues = async (id) => {
    return await axios.get('https://comicvine.gamespot.com/api/issues/', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            filter: `volume:${id}`,
        },
    });
};

const getVolumes = async (id) => {
    return await axios.get(`https://comicvine.gamespot.com/api/volume/4050-${id}`, {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
        },
    });
};

const searchVolumes = async (field, fieldValue) => {
    return await axios.get('https://comicvine.gamespot.com/api/volumes', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            filter: `${field}:${fieldValue}`,
        },
    });
};

export { searchIssues, getIssues, getVolumes, saveIssues, searchVolumes };

