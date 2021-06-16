import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataServices from '../../services/data.services';
import { WishlistBtn, CollectionBtn } from '../../components';

const IssueDetail = () => {
    const { apiRef } = useParams();
    const [issue, setIssue] = useState({});
    

    useEffect(() => {
        DataServices.findIssue(apiRef)
            .then(issue => setIssue(issue));
        
    }, []);


    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap overscroll-auto overflow-auto">
                    <img alt={issue?.name} 
                        className="lg:w-1/2 w-full 
                        lg:h-auto h-64 object-cover object-top rounded overflow-scroll" 
                        src={issue?.image}/>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            <b>{issue?.volume?.name} #{issue?.issue_number}</b>
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{}</h1>
                        <p className="leading-relaxed"> <b>Story:</b> {issue?.description}</p>
                        <div className="flex flex-col leading-relaxed space-y-1">
                            <div className="flex flex-wrap space-x-3">
                            </div>
                        </div>
                        <WishlistBtn props={apiRef} />
                        <CollectionBtn props={apiRef} />
                    </div>
                </div>
            </div>
        </section>);
};

export default IssueDetail;