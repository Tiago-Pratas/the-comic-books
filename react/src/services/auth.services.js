import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const AuthService = {
    register: async (userData) => {
        try {
            const request = await axios.post(`${serverUrl}/register`, userData, { withCredentials: true});
            
            return request.data;

        } catch (error) {
            return error;
        }
    
    },

    login: async (userData) => {
        try {
            const request = await axios.post(`${serverUrl}/login`, userData, { withCredentials: true });
        
            return request.data;
    
        } catch (error) {
            return error;
        }
    },

    checkSession:async () => {
        try {
            const request = await axios.get(`${serverUrl}/check-session`, {withCredentials: true});
            
            return request.data;

        } catch (error) {
            return error;
        }
    },
    
    logout: async (user) => {
        const request = await axios.post(`${serverUrl}/logout`, user, {withCredentials: true});
    
        return request;
    },
    
    sendEmailValidation: async (email, token) => {
        const request = await axios.post(`${serverUrl}/${email}/${token}`);    
        
        return request.data.username;
    },
    
    
};

export default AuthService;