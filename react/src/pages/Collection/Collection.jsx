import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Collection = () => {
    const { collections, wishlists } = useSelector(state => state.data);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        console.log(collections, wishlists);
    }, [user?._id]);
    console.log(collections, wishlists);


    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                    <h1 className="sm:text-3xl text-2xl 
                        font-medium title-font mb-2 text-gray-900"
                    >
                        Your Collection
                    </h1>
                    <div className="h-1 w-20 bg-red-500 rounded"></div>
                </div>
            </div>
            <div className="flex flex-wrap m-4">
                {
                    collections?.map(collection => (
                    
                        <div className="xl:w-1/4 md:w-1/2 p-4" key={collection.issue_number + 1}>
                            <div className="bg-yellow-100 p-2 rounded-lg">
                                <img className="h-100 rounded w-full object-cover object-top mb-6" 
                                    src={collection.image} alt="content"/>
                                <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">
                                    {collection.volume.name}
                                </h3>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                    {collection.volume.name} {collection.issue_number}</h2>
                                <p className="leading-relaxed text-base">
                                    <Link to={`/price/${user._id}/${collection._id}`}>Update</Link>
                                </p>
                            </div>
                        </div>
                   
                    ))
                }
            </div>
        </div>
    </section>;
};

export default Collection;