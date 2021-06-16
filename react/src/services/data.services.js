import axios from 'axios';
import { mapper } from '../utils/data.utils';

const serverUrl = import.meta.env.VITE_SERVER_URL;
const comicUrl = import.meta.env.VITE_CV_URL;
const comicApiKey = import.meta.env.VITE_CV_API_KEY;
const corsAnywhere = import.meta.env.VITE_CORS_ANYWHERE;

//TODO: add utils to shorten the aearch function

const DataServices = {
    searchIssues: async (query) => {
        //TODO: refactor this whole shebang
        try {
            const issues = await axios.get(`${corsAnywhere}${comicUrl}/search`,
                { params: {
                    api_key: comicApiKey,
                    format: 'json',
                    resources: 'issue',
                    query: query,
                } });

            const savedIssues = await Promise.all(issues.data.results.map(async (issue) => {
                const mapedIssue = mapper(issue);

                const findIssue = await axios.get(`${serverUrl}/issues/find/${mapedIssue.apiRef}`,
                    { withCredentials: true });

                if (!findIssue.data) {
                    const savedIssue = await axios.get(`${corsAnywhere}${comicUrl}/issue/4000-${mapedIssue.apiRef}`, {
                        params: {
                            api_key: comicApiKey,
                            format: 'json',
                        }
                    });

                    const response = await axios.post(`${serverUrl}/issues/save`,
                        mapper(savedIssue.data.results), { withCredentials: true });
                    
                    return response.data;
                }

                return findIssue.data;
            }));

            return savedIssues;
        } catch (error) {
            return error;
        }
    },

    findIssue: async (apiRef) => {
        const issue = await axios.get(`${serverUrl}/issues/find/${apiRef}`, 
            { withCredentials: true });
        return issue.data;
    },

    saveTocollection: async (id, apiRef) => {
        return await axios.post(`${serverUrl}/issues/save-collection/`,
            { id: id, apiRef: apiRef },
            { withCredentials: true } );
    },

    saveToWishlist: async (id, apiRef) => {
        try {
            return await axios.post(`${serverUrl}/issues/save-wishlist/`,
                { id: id, apiRef: apiRef },
                { withCredentials: true } ); 
        } catch (error) {
            return error;
        }
        
    },

    findCollection: async (id) => {
        try {
            const collection = await axios.get(`${serverUrl}/issues/get-collection/${id}`,
                { withCredentials: true });
            
            return collection.data;
        } catch (error) {
            return error;
        }
    },

    findWishlist: async (id) => {
        try {
            const collection = await axios.get(`${serverUrl}/issues/get-wishlist/${id}`,
                { withCredentials: true }); 

            return collection.data;
        } catch (error) {
            return error;
        }
    }

};

export default DataServices;