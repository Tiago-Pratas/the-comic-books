import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { checkSessionAsync } from './redux/slices/auth.slice';
import { findCollectionAsync, findWishlistAsync } from './redux/slices/data.slice';
import * as Components from './components/index';
import * as Pages  from './pages/index';
import './tailwind.output.css';

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkSessionAsync());
        dispatch(findCollectionAsync(user?._id));
        dispatch(findWishlistAsync(user?._id));
    }, [user?._id]);


    

    return<>
        <BrowserRouter>
            <Components.Header />
            <main>
                <Route path='/' exact={true} component={Pages.Landing}>
                </Route>
                <Switch>
                    <Route path='/home' exact={true} component={Pages.Home}>
                    </Route>
                    <Route path='/register' component={Pages.Auth}>
                    </Route>
                    <Components.SecureRoute path='/search' component={Pages.Search}>
                    </Components.SecureRoute>
                    <Components.SecureRoute path='/price/:id/:apiRef' exact={true} component={Pages.IssuePrice}>
                    </Components.SecureRoute>
                    <Components.SecureRoute path='/:volume/:number/:apiRef' exact={true} component={Pages.IssueDetail}>
                    </Components.SecureRoute>
                    <Components.SecureRoute path='/collection' component={Pages.Collection}>
                    </Components.SecureRoute>
                </Switch>

            </main>
        </BrowserRouter>
    </>;
}

export default App;
