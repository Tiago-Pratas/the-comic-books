import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';

const SecureRoute = (props) => {
    let { hasUser } = useSelector(state => state.auth);

    if ( hasUser === null ) {
        //TODO: loader
        return <Loader />;
    }

    if(hasUser) {
        return(<Route { ...props }/>);
    }

    if(!hasUser) {
        return(<Redirect to='/Register'/>);
    }
};

export default SecureRoute;