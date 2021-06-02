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

const getIssue = async (apiRef) => {
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

const getVolume = async (id) => {
    return await axios.get(`https://comicvine.gamespot.com/api/volume/4050-${id}`, {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
        },
    });
};

const searchVolumes = async (field, fieldValue, result) => {
    return Promise.apply(await axios.get('https://comicvine.gamespot.com/api/volumes', {
        params: {
            api_key: process.env.API_KEY,
            format: 'json',
            limit: '10',
            offset: result,
            filter: `${field}:${fieldValue}`,
        },
    }));
};

const response = async () => {
    return await searchVolumes();
};

console.log(searchVolumes());
export { searchIssues, getIssue, getVolume, saveIssues, searchVolumes };
