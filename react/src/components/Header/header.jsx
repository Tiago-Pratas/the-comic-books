import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../redux/slices/auth.slice';
import { FaBookDead, FaHome, FaSearch, FaShoppingBag, FaDoorOpen } from 'react-icons/fa';

const Header = () => {
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logoutAsync(user.id));
    };

    return <header className="text-gray-600 body-font bg-yellow-100 opacity-1">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font 
                font-medium items-center 
                text-gray-900 mb-4 md:mb-0" href="/" />
            <img src={user && user.profilePic || 'https://tinyurl.com/p2rjh73s'} 
                className="w-20 h-20 text-white p-2 rounded-full" /> 
            <span className="ml-3 text-xl">The comic books</span>

            {
                user && <>
                    <nav className="md:ml-auto 
                md:mr-auto flex flex-wrap 
                items-center text-base justify-center">
                        <a className="mr-5 hover:text-red-500" 
                            href="/collection">
                            <FaHome />
                            <span clsssName="inline-flex">Home</span>
                        </a>
                        <a className="mr-5 hover:text-red-500" 
                            href="/collection">
                            <FaBookDead />
                            Collection
                        </a>
                        <a className="mr-5 hover:text-red-500" 
                            href="/search">
                            <FaSearch />
                            Search
                        </a>
                        <a className="mr-5 hover:text-red-500" 
                            href="/market">
                            <FaShoppingBag />
                            Buy Comics
                        </a>
                    </nav>
                    <button className="inline-flex items-center 
                        bg-yellow-300 border-0 py-1 px-3 focus:outline-none 
                        hover:bg-yellow-500 rounded text-base mt-4 md:mt-0"
                    onClick={() => logoutUser()}>
                        <FaDoorOpen />
                        Logout
                    </button>
                </>
            }
            
        </div>
    </header>;

};

export default Header ;

