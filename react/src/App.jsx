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
                    <Route path='/search' component={Pages.Search}>
                    </Route>
                    <Route path='/price/:id/:apiRef' exact={true} component={Pages.IssuePrice}>
                    </Route>
                    <Route path='/:volume/:number/:apiRef' exact={true} component={Pages.IssueDetail}>
                    </Route>
                    <Route path='/collection' component={Pages.Collection}>
                    </Route>
                </Switch>

            </main>
        </BrowserRouter>
    </>;
}

export default App;
