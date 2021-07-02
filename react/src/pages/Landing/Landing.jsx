import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../assets/Hero.jpg'; 

const Landing = () => {
    return <section className="text-gray-600 body-font">
        <div className="container mx-auto flex 
            px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 
                lg:pr-24 md:pr-16 flex flex-col 
                md:items-start md:text-left mb-16 
                md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl 
                text-3xl mb-4 font-medium text-gray-900">Before they sold out
                    <br className="hidden lg:inline-block"/>readymade gluten
                </h1>
                <p className="mb-8 leading-relaxed">Lorem ipsum dolor 
                    sit amet consectetur adipisicing elit. Alias 
                    blanditiis magnam tenetur deserunt facere nemo 
                    quo aliquam! Doloribus vitae accusamus eligendi 
                    quis aut obcaecati repellat, perferendis, porro, 
                    voluptates quasi laboriosam.</p>
                <div className="flex justify-center">
                    <button className="inline-flex 
                        text-white bg-red-500 
                        border-0 py-2 px-6 focus:outline-none 
                        hover:text-gray-700 hover:bg-gray-100 
                        rounded text-lg"><Link href="/register">Sign Up</Link></button>
                </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded-lg shadow-lg" 
                    alt="hero" src={Hero}/>
            </div>
        </div>
    </section>;
};

export default Landing;