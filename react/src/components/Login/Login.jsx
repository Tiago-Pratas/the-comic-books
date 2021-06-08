import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../redux/slices/auth.slice';
import Google from '../../assets/google.svg?component';
import Twitter from '../../assets/twitter.svg?component';

const Login = () => {
    const [formData, setFormData] = useState({});
    const error  = useSelector(state => state.auth.error);
    const dispatch = useDispatch();

    console.log('here', Twitter);

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        dispatch(loginAsync(formData));
    };

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <img src="https://tinyurl.com/e4hnycmp"
                        className="w-full h-auto 
                            bg-gray-400 hidden lg:block 
                            lg:w-1/2 bg-cover rounded-l-lg"
                    />
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Login</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                            onSubmit={handleFormSubmit}
                        >
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" 
                                    htmlFor="username">
									Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 
                                        text-sm leading-tight 
                                        text-gray-700 border 
                                        rounded shadow appearance-none 
                                        focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" 
                                    htmlFor="password">
									Password
                                </label>
                                <input
                                    className="w-full px-3 
                                        py-2 mb-3 text-sm leading-tight 
                                        text-gray-700 border border-red-500 
                                        rounded shadow appearance-none focus:outline-none 
                                        focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="******************"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                />
                            </div>
                            
                            {
                                error &&

                        <div className="flex 
                            w-full max-w-sm 
                            mx-auto overflow-hidden 
                            bg-white rounded-lg shadow-md 
                            dark:bg-gray-800">
                            <div className="flex items-center justify-center w-12 bg-red-500">
                                <svg className="w-6 h-6 text-white fill-current" 
                                    viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 3.36667C10.8167 3.36667 
                                    3.3667 10.8167 3.3667 20C3.3667 29.1833 
                                    10.8167 36.6333 20 36.6333C29.1834 36.6333 
                                    36.6334 29.1833 36.6334 20C36.6334 10.8167 
                                    29.1834 3.36667 20 3.36667ZM19.1334 
                                    33.3333V22.9H13.3334L21.6667 
                                    6.66667V17.1H27.25L19.1334 33.3333Z"/>
                                </svg>
                            </div>

                            <div className="px-4 py-2 -mx-3">
                                <div className="mx-3">
                                    <span className="font-semibold 
                                    text-red-500 dark:text-red-400">Error:</span>
                                    <p className="text-sm 
                                        text-gray-600 
                                        dark:text-gray-200 "
                                    >{error}</p>
                                </div>
                            </div>
                        </div>
                            }


                            <div className="mb-6 text-center pt-5">
                                <button
                                    className="w-full px-4 py-2 
                                    font-bold text-white bg-red-500 
                                    rounded hover:bg-red-700 focus:outline-none 
                                    focus:shadow-outline"
                                    type="Submit"
                                >
									Sign In
                                </button>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <span className="flex items-center justify-center space-x-2">
                                    <span className="h-px bg-gray-400 w-14"></span>
                                    <span className="font-normal text-gray-500">or login with</span>
                                    <span className="h-px bg-gray-400 w-14"></span>
                                </span>
                                <div className="flex flex-col space-y-4">
                                    <a
                                        href="#"
                                        className="flex items-center 
                                        justify-center px-4 py-2 space-x-2 
                                        transition-colors duration-300 border border-gray-800 
                                        rounded-md group hover:bg-gray-800 focus:outline-none"
                                    >
                                        <span>
                                            <Google />
                                        </span>
                                        <span className="text-sm 
                                            font-medium text-gray-800 
                                            group-hover:text-white">Google</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center 
                                        justify-center px-4 py-2 
                                        space-x-2 transition-colors 
                                        duration-300 border border-blue-500 
                                        rounded-md group hover:bg-blue-500 
                                        focus:outline-none"
                                    >
                                        <span>
                                            <Twitter />
                                            {console.log(Twitter)}
                                        </span>
                                        <span className="text-sm font-medium 
                                        text-blue-500 group-hover:text-white">Twitter</span>
                                    </a>
                                </div>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <a className="inline-block 
                                    text-sm text-blue-500 
                                    align-baseline hover:text-blue-800"
                                href="./register"
                                >
                                Create an Account!
                                </a>
                            </div>
                            <div className="text-center">
                                <a className="inline-block text-sm 
                                    text-blue-500 align-baseline 
                                    hover:text-blue-800"
                                href="./forgot-password"
                                >
                                Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;