import React from 'react';
import './tailwind.output.css';
import { Header } from './components/index';
import Auth  from './pages/Auth/Auth';

function App() {
  
    return <div>
        <Header />
        <Auth />
    </div>;
}

export default App;
