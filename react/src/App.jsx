import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkSessionAsync } from './redux/slices/auth.slice';
import './tailwind.output.css';
import { Header } from './components/index';
import Auth  from './pages/Auth/Auth';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSessionAsync());
    }, []);
    
    

    return <div>
        <Header />
        <Auth />
    </div>;
}

export default App;
