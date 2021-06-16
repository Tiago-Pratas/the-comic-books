import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuth = () => {
    return <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`}
        className="flex items-center 
            justify-center px-4 py-2 space-x-2 
            transition-colors duration-300 border border-gray-800 
            rounded-md group hover:bg-gray-800 focus:outline-none">
        <span>
            <FcGoogle  />
        </span>
        <span className="text-sm 
        font-medium text-gray-800 
        group-hover:text-white">Google</span>
    </a>;
};

export default GoogleAuth;
