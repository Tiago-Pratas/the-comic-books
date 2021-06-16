import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchIssuesAsync } from '../../redux/slices/data.slice';

const Search = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const { issues } = useSelector(state => state.data);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        dispatch(searchIssuesAsync(query));
        setQuery('');
    };

    const handleInputChange = (ev) => {
        const { value } = ev.target;
        setQuery(value);
    };

    return <>
        <div >
            <form className="flex justify-center flex-col" onClick={handleSubmit}>
                <div className="flex justify-center p-5 flex-col">
                    <label htmlFor="search" className="for"></label>
                    <input
                        className="w-full justify-items-center
                            p-4 mb-3 w-3 text-sm leading-tight 
                            text-gray-700 border border-red-500 
                            rounded shadow appearance-none focus:outline-none 
                            focus:shadow-outline"
                        id="query"
                        type="text"
                        name="query"
                        placeholder="Search"
                        onChange={handleInputChange}
                        value={query}
                    />
                    <button className="btn btn-yellow">SEARCH</button>
                </div>
            </form>
        </div>

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        issues?.map(issue => (
                            
                            <div className="p-4 lg:w-1/4 md:w-1/2" key={issue?.name}>
                                <div className="h-full flex flex-col items-center text-center" 
                                    key={issue?.number}>
                                    <img alt={issue?.image?.tags} 
                                        className="flex-shrink-0 rounded-lg 
                                        w-full h-95 object-cover 
                                        object-center mb-4" src={issue?.image} 
                                        key={issue?.name}/>
                                    <div className="w-full" key={issue?.name}>
                                        <h2 className="title-font font-medium 
                                        text-lg text-gray-900">{issue?.volume?.name}</h2>
                                        <p className="text-gray-500 p-1 " 
                                            key={issue?.name}>#{issue?.issue_number}</p>
                                        <Link key={issue.issue_number + 1} 
                                            to={`/${issue.volume?.name}/${issue.issue_number}/${issue.apiRef}`}>
                                                See more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                                
                        ))
                    }      
                </div>
            </div>
        </section>

    </>;
    
};

export default Search;