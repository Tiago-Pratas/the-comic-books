import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const searchIssues = async (field, fieldValue, result) => {
    return await axios.get('https://comicvine.gamespot.com/api/issues', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            limit: '100',
            offset: result,
            filter: `${field}:${fieldValue}`,
        },
    });
};

const getIssues = async (apiRef) => {
    return await axios.get(`https://comicvine.gamespot.com/api/issue/4000-${apiRef}/`,
        {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
            },
        },
    );
};

const saveIssues = async (id, result) => {
    return await axios.get('https://comicvine.gamespot.com/api/issues/', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            offset: result,
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

const searchVolumes = async (field, fieldValue, result) => {
    return await axios.get('https://comicvine.gamespot.com/api/volumes', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            limit: '100',
            offset: result,
            filter: `${field}:${fieldValue}`,
        },
    });
};

export { searchIssues, getIssues, getVolumes, saveIssues, searchVolumes };

