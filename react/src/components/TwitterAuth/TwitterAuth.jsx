import React from 'react';
import { IoLogoTwitter } from 'react-icons/io';

const TwitterAuth = () => {
    return <a
        href={`${import.meta.env.VITE_SERVER_URL}auth/twitter`}
        className="flex items-center 
            justify-center px-4 py-2 
            space-x-2 transition-colors 
            duration-300 border border-blue-500 
            rounded-md group hover:bg-blue-500 
            focus:outline-none">
        <span>
            <IoLogoTwitter className="text-blue-500"/>
        </span>
        <span className="text-sm font-medium 
            text-blue-500 group-hover:text-white">Twitter</span>
    </a>;
};

export default TwitterAuth;