import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const SecureRoute = (props) => {
    let { hasUser } = useSelector(state => state.auth);

    if ( hasUser === null ) {
        //TODO: loader
        return;
    }

    if(hasUser) {
        //tenemos usuario: true
        return(<Route { ...props }/>);
    }

    if(!hasUser) {
        //no hay usuario logueado
        return(<Redirect to='/Register'/>);
    }
};

export default SecureRoute;