import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { checkSessionAsync } from './redux/slices/auth.slice';
import * as Components from './components/index';
import * as Pages  from './pages/index';
import './tailwind.output.css';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSessionAsync());
    }, []);
    
    

    return <div>
        <>
            <BrowserRouter>
                <Components.Header />
                <main>
                    <Switch>
                        <Route path='/' exact={true} component={Pages.Landing}></Route>
                        <Route path='/register' component={Pages.Auth}></Route>
                        <Route path='/search' component={Pages.Search}></Route>
                    </Switch>

                </main>
            </BrowserRouter>
        </>
    </div>;
}

export default App;
