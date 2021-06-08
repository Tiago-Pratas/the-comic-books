import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector(state => state.auth);

    return <header className="text-gray-600 body-font bg-yellow-100 opacity-1">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font 
                font-medium items-center 
                text-gray-900 mb-4 md:mb-0" href="/">
                <img src="https://tinyurl.com/p2rjh73s" 
                    className="w-20 h-20 text-white p-2 rounded-full" />
                <span className="ml-3 text-xl">The comic books</span>
                
            </a>
            {
                user && <nav className="md:ml-auto 
                md:mr-auto flex flex-wrap 
                items-center text-base justify-center">
                    <a className="mr-5 hover:text-red-500" 
                        href="/volumes/collection">My Collection</a>
                    <a className="mr-5 hover:text-red-500" 
                        href="/volumes/wishlist">My Wishlist</a>
                    <a className="mr-5 hover:text-red-500" 
                        href="/volumes/search">Add Comics</a>
                    <a className="mr-5 hover:text-red-500" 
                        href="/market">Get Comics</a>
                </nav>
            }
        </div>
    </header>;

};

export default Header ;

