import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

console.log(`${serverUrl}/auth/register`);

const AuthService = {
    register: async (userData) => {
        try {
            const request = await axios.post(`${serverUrl}/auth/register`,
                userData,
                { withCredentials: true });

            return request.data;

        } catch (error) {
            return error;
        }
    
    },

    login: async (userData) => {
        try {
            const request = await axios.post(`${serverUrl}/auth/login`,
                userData, 
                { withCredentials: true });

            return request.data;
        } catch (error) {
            return error;
        }
    },

    checkSession: async () => {
        try {
            const request = await axios.get(`${serverUrl}/auth/check-session`,
                { withCredentials: true });

            console.log(request);
            
            return request.data;

        } catch (error) {
            return error;
        }
    },
    
    logout: async (user) => {
        const request = await axios.post(`${serverUrl}/logout`, 
            user, 
            { withCredentials: true });
    
        return request;
    },
    
    sendEmailValidation: async (email, token) => {
        try {
            const request = await axios.post(`${serverUrl}/${email}/${token}`);    
            
            return request.data.username;
            
        } catch (error) {
            return error;
        }
    },

    googleLogin: async () => {

        try {
            const request = await axios.get(`${serverUrl}/auth/google`, { withCredentials: true });
    
            console.log('here', request);
    
            return request;
            
        } catch (error) {
            return error;
        }
    }
    
    
};

export default AuthService;